Set-Location $PSScriptRoot
$env:PATH = "$PSScriptRoot\.tools\node_modules\node\bin;$env:PATH"
$env:XDG_CONFIG_HOME = "$PSScriptRoot\.cache\xdg"
$env:npm_config_cache = "$PSScriptRoot\.cache\npm"
& "$PSScriptRoot\.tools\node_modules\node\bin\node.exe" "$PSScriptRoot\.tools\node_modules\npm\bin\npm-cli.js" --prefix backend run start
