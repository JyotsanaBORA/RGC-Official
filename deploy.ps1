$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot

Write-Host "`n=== Reddington Global — Auto Deploy ===" -ForegroundColor Cyan
Set-Location $ProjectDir

Write-Host "`n[1/4] Pulling latest code..." -ForegroundColor Yellow
git pull
if ($LASTEXITCODE -ne 0) { Write-Host "git pull failed." -ForegroundColor Red; exit 1 }

Write-Host "`n[2/4] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { Write-Host "npm install failed." -ForegroundColor Red; exit 1 }

Write-Host "`n[3/4] Building production bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed." -ForegroundColor Red; exit 1 }

Write-Host "`n[4/4] Deploy complete." -ForegroundColor Green
Write-Host "Run 'npm start' to serve the production build.`n" -ForegroundColor Cyan
