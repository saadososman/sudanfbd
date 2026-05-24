Set-Location $PSScriptRoot
npm.cmd --prefix frontend run dev *> frontend\dev-server-powershell.log
"Exited with code $LASTEXITCODE" | Add-Content frontend\dev-server-powershell.log
