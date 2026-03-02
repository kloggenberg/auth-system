<#
.SYNOPSIS
    Build script for the UserService project with short aliases.
#>
Param(
    [Alias("ut")][Parameter(Mandatory=$false)][switch]$unittest,
    [Alias("it")][Parameter(Mandatory=$false)][switch]$integrationtest,
    [Alias("up")][Parameter(Mandatory=$false)][switch]$docker,
    [Alias("down")][Parameter(Mandatory=$false)][switch]$stop,
    [Alias("a")][Parameter(Mandatory=$false)][switch]$all
)

$ErrorActionPreference = "Stop"

if ($PSBoundParameters.Count -eq 0 -or $all) {
    $unittest = $integrationtest = $docker = $true
}

Write-Host "--- Starting Build Process ---" -ForegroundColor Cyan

if ($stop) {
    Write-Host "`n🛑 Stopping and removing Docker containers..." -ForegroundColor Red
    docker-compose down
}

if ($unittest) {
    Write-Host "`n🧪 [1] Running Unit Tests..." -ForegroundColor Yellow
    Push-Location ./backend/UserService.Tests
    dotnet test
    Pop-Location
}

if ($integrationtest) {
    Write-Host "`n🧪 [2] Running Integration Tests..." -ForegroundColor Yellow
    Push-Location ./backend/UserService.IntegrationTests
    dotnet test
    Pop-Location
}

if ($docker) {
    Write-Host "`n🐳 [3] Building and Starting Docker Containers..." -ForegroundColor Yellow
    docker-compose up --build -d
    Write-Host "System is live at http://localhost" -ForegroundColor Gray
}

Write-Host "`nDone!" -ForegroundColor Green