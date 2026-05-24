$root = Split-Path -Parent $PSScriptRoot
$srcRoot = Join-Path $root "src"
$distRoot = Join-Path $root "dist\src"

Get-ChildItem (Join-Path $srcRoot "api") -Recurse -Filter schema.json | ForEach-Object {
  $relative = $_.FullName.Substring($srcRoot.Length + 1)
  $target = Join-Path $distRoot $relative
  New-Item -ItemType Directory -Force (Split-Path $target) | Out-Null
  Copy-Item -LiteralPath $_.FullName -Destination $target -Force
}
