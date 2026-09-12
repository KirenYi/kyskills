[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter()]
    [string]$WeChatPath,

    [Parameter()]
    [ValidateSet('Desktop', 'Startup')]
    [string]$Destination = 'Desktop',

    [Parameter()]
    [ValidateNotNullOrEmpty()]
    [string]$ShortcutName = (-join ([char[]](0x5FAE, 0x4FE1, 0x53CC, 0x5F00))),

    [Parameter()]
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function ConvertTo-CandidatePath {
    param([AllowNull()][string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }

    $candidate = [Environment]::ExpandEnvironmentVariables($Value).Trim()
    if ($candidate -match '^\s*"(?<path>[^"]+\.exe)"(?:,\-?\d+)?\s*$') {
        return $Matches.path
    }
    if ($candidate -match '^\s*(?<path>.+?\.exe)(?:,\-?\d+)?\s*$') {
        return $Matches.path.Trim('"')
    }
    return $candidate.Trim('"')
}

function Get-OptionalPropertyValue {
    param(
        [Parameter(Mandatory = $true)]
        [object]$InputObject,

        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    $property = $InputObject.PSObject.Properties[$Name]
    if ($null -eq $property -or $null -eq $property.Value) {
        return $null
    }
    return [string]$property.Value
}

function Test-OfficialWeChatExecutable {
    param([AllowNull()][string]$Path)

    if ([string]::IsNullOrWhiteSpace($Path) -or -not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        return $false
    }

    $item = Get-Item -LiteralPath $Path
    if ($item.Name -notmatch '^(Weixin|WeChat)\.exe$') {
        return $false
    }

    $company = [string]$item.VersionInfo.CompanyName
    $product = [string]$item.VersionInfo.ProductName
    $signature = Get-AuthenticodeSignature -LiteralPath $Path
    $signerSubject = if ($signature.SignerCertificate) {
        [string]$signature.SignerCertificate.Subject
    }
    else {
        ''
    }

    $isOfficial =
        $company -match 'Tencent' -and
        $product -match '(Weixin|WeChat)' -and
        $signature.Status -eq 'Valid' -and
        $signerSubject -match 'Tencent'
    return $isOfficial
}

function Resolve-OfficialWeChatExecutable {
    param([AllowNull()][string]$RequestedPath)

    if (-not [string]::IsNullOrWhiteSpace($RequestedPath)) {
        $normalized = ConvertTo-CandidatePath $RequestedPath
        if (-not (Test-OfficialWeChatExecutable $normalized)) {
            throw "The selected executable is not a valid Tencent-signed WeChat client: $normalized"
        }
        return (Resolve-Path -LiteralPath $normalized).Path
    }

    $candidateSet = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)

    foreach ($processName in @('Weixin', 'WeChat')) {
        foreach ($process in @(Get-Process -Name $processName -ErrorAction SilentlyContinue)) {
            try {
                $processPath = ConvertTo-CandidatePath $process.Path
                if ($processPath) {
                    [void]$candidateSet.Add($processPath)
                }
            }
            catch {
                # Some protected processes do not expose Path; continue with registry discovery.
            }
        }
    }

    $appPathKeys = @(
        'HKCU:\Software\Microsoft\Windows\CurrentVersion\App Paths\Weixin.exe',
        'HKLM:\Software\Microsoft\Windows\CurrentVersion\App Paths\Weixin.exe',
        'HKCU:\Software\Microsoft\Windows\CurrentVersion\App Paths\WeChat.exe',
        'HKLM:\Software\Microsoft\Windows\CurrentVersion\App Paths\WeChat.exe'
    )
    foreach ($key in $appPathKeys) {
        if (Test-Path -LiteralPath $key) {
            $entry = Get-ItemProperty -LiteralPath $key
            $entryPath = ConvertTo-CandidatePath (Get-OptionalPropertyValue -InputObject $entry -Name '(default)')
            if ($entryPath) {
                [void]$candidateSet.Add($entryPath)
            }
        }
    }

    $uninstallRoots = @(
        'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*',
        'HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*',
        'HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*'
    )
    foreach ($root in $uninstallRoots) {
        foreach ($entry in @(Get-ItemProperty -Path $root -ErrorAction SilentlyContinue)) {
            $displayName = Get-OptionalPropertyValue -InputObject $entry -Name 'DisplayName'
            $displayIcon = ConvertTo-CandidatePath (Get-OptionalPropertyValue -InputObject $entry -Name 'DisplayIcon')
            $iconLooksRelevant = $displayIcon -and ([IO.Path]::GetFileName($displayIcon) -match '^(Weixin|WeChat)\.exe$')
            if ($displayName -match '^(Weixin|WeChat)(\s|$)' -or $iconLooksRelevant) {
                if ($displayIcon) {
                    [void]$candidateSet.Add($displayIcon)
                }

                $installLocationValue = Get-OptionalPropertyValue -InputObject $entry -Name 'InstallLocation'
                $installLocation = if ($installLocationValue) { $installLocationValue.Trim().Trim('"') } else { $null }
                if ($installLocation) {
                    foreach ($fileName in @('Weixin.exe', 'WeChat.exe')) {
                        [void]$candidateSet.Add((Join-Path $installLocation $fileName))
                    }
                }
            }
        }
    }

    $knownRoots = @(
        [Environment]::GetFolderPath('ProgramFiles'),
        [Environment]::GetFolderPath('ProgramFilesX86'),
        [Environment]::GetFolderPath('LocalApplicationData')
    ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    foreach ($root in $knownRoots) {
        foreach ($relativePath in @(
            'Tencent\Weixin\Weixin.exe',
            'Tencent\WeChat\WeChat.exe',
            'Weixin\Weixin.exe',
            'WeChat\WeChat.exe'
        )) {
            [void]$candidateSet.Add((Join-Path $root $relativePath))
        }
    }

    $verified = @(
        $candidateSet |
            Where-Object { Test-OfficialWeChatExecutable $_ } |
            ForEach-Object { (Resolve-Path -LiteralPath $_).Path } |
            Sort-Object -Unique
    )

    if ($verified.Count -eq 0) {
        throw 'No valid Tencent-signed WeChat installation was found. Re-run with -WeChatPath and the absolute path to the official Weixin.exe or WeChat.exe.'
    }
    if ($verified.Count -gt 1) {
        $choices = $verified -join [Environment]::NewLine
        throw "Multiple valid Tencent-signed WeChat installations were found. Re-run with -WeChatPath and one exact path:$([Environment]::NewLine)$choices"
    }

    return $verified[0]
}

if (
    [IO.Path]::GetFileName($ShortcutName) -ne $ShortcutName -or
    $ShortcutName.EndsWith('.lnk', [StringComparison]::OrdinalIgnoreCase) -or
    $ShortcutName.IndexOfAny([IO.Path]::GetInvalidFileNameChars()) -ge 0
) {
    throw 'ShortcutName must be a file-name-safe label without a path or .lnk extension.'
}

$resolvedWeChatPath = Resolve-OfficialWeChatExecutable $WeChatPath
$weChatItem = Get-Item -LiteralPath $resolvedWeChatPath
$signature = Get-AuthenticodeSignature -LiteralPath $resolvedWeChatPath
$destinationPath = if ($Destination -eq 'Startup') {
    [Environment]::GetFolderPath('Startup')
}
else {
    [Environment]::GetFolderPath('Desktop')
}

if ([string]::IsNullOrWhiteSpace($destinationPath) -or -not (Test-Path -LiteralPath $destinationPath -PathType Container)) {
    throw "The Windows $Destination folder could not be resolved."
}

$shortcutPath = Join-Path $destinationPath ($ShortcutName + '.lnk')
$powershellPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
if (-not (Test-Path -LiteralPath $powershellPath -PathType Leaf)) {
    throw "Windows PowerShell was not found at $powershellPath"
}

$shell = New-Object -ComObject WScript.Shell
if (Test-Path -LiteralPath $shortcutPath -PathType Leaf) {
    $existing = $shell.CreateShortcut($shortcutPath)
    $managedShortcut =
        ([string]$existing.Arguments -match 'Start-Process.+(Weixin|WeChat)\.exe') -or
        ([string]$existing.Description -match 'two.*WeChat')
    if (-not $managedShortcut -and -not $Force) {
        throw "An unrelated shortcut already exists at $shortcutPath. Use -Force only after the user explicitly authorizes replacement."
    }
}

$escapedWeChatPath = $resolvedWeChatPath.Replace("'", "''")
$launchCommand = "Start-Process -FilePath '$escapedWeChatPath'; Start-Process -FilePath '$escapedWeChatPath'"
$shortcutArguments = "-NoLogo -NoProfile -WindowStyle Hidden -Command `"$launchCommand`""

$writePerformed = $false
if ($PSCmdlet.ShouldProcess($shortcutPath, 'Create or update the official WeChat dual-launch shortcut')) {
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $powershellPath
    $shortcut.Arguments = $shortcutArguments
    $shortcut.WorkingDirectory = $weChatItem.DirectoryName
    $shortcut.IconLocation = $resolvedWeChatPath + ',0'
    $shortcut.Description = 'Launches two official Tencent WeChat windows'
    $shortcut.WindowStyle = 7
    $shortcut.Save()
    $writePerformed = $true
}

if (-not $writePerformed) {
    [pscustomobject]@{
        Status          = 'NotChanged'
        Destination     = $Destination
        ShortcutPath    = $shortcutPath
        WeChatPath      = $resolvedWeChatPath
        ProductVersion  = $weChatItem.VersionInfo.ProductVersion
        CompanyName     = $weChatItem.VersionInfo.CompanyName
        SignatureStatus = [string]$signature.Status
        UsesOfficialExe = $true
        ExternalScript  = $false
        InstanceCount   = 2
    }
    return
}

if (-not (Test-Path -LiteralPath $shortcutPath -PathType Leaf)) {
    throw "The shortcut was not created at $shortcutPath"
}

$saved = $shell.CreateShortcut($shortcutPath)
$valid =
    ([string]$saved.TargetPath -ieq $powershellPath) -and
    ([string]$saved.Arguments -eq $shortcutArguments) -and
    ([string]$saved.WorkingDirectory -ieq $weChatItem.DirectoryName) -and
    ([string]$saved.IconLocation -like ($resolvedWeChatPath + ',*'))

if (-not $valid) {
    throw 'The shortcut was saved, but its target, arguments, working directory, or icon did not validate.'
}

[pscustomobject]@{
    Status          = 'InstalledAndValidated'
    Destination     = $Destination
    ShortcutPath    = $shortcutPath
    WeChatPath      = $resolvedWeChatPath
    ProductVersion  = $weChatItem.VersionInfo.ProductVersion
    CompanyName     = $weChatItem.VersionInfo.CompanyName
    SignatureStatus = [string]$signature.Status
    SignerSubject   = [string]$signature.SignerCertificate.Subject
    UsesOfficialExe = $true
    ExternalScript  = $false
    InstanceCount   = 2
}
