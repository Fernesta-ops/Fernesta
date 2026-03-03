param(
  [Parameter(Mandatory = $true)]
  [string]$Commit,
  [string]$OutputDir = "publish-changelog"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

$resolvedCommit = (git rev-parse --verify $Commit).Trim()
$shortCommit = (git rev-parse --short $resolvedCommit).Trim()
$subject = (git show -s --format=%s $resolvedCommit).Trim()
$author = (git show -s --format='%an <%ae>' $resolvedCommit).Trim()
$dateIso = (git show -s --format=%cI $resolvedCommit).Trim()
$dateStamp = (Get-Date $dateIso).ToString("yyyy-MM-dd")
$outputPath = Join-Path $OutputDir "$dateStamp`_$shortCommit.txt"

$nameStatus = git show --name-status --pretty="" $resolvedCommit
$fullDiff = git show --no-color $resolvedCommit

@(
  "Publish Change Log"
  "=================="
  ""
  "Commit: $resolvedCommit"
  "Short Commit: $shortCommit"
  "Date: $dateIso"
  "Author: $author"
  "Message: $subject"
  ""
  "Changed Files (Name/Status)"
  "---------------------------"
  $nameStatus
  ""
  "Full Diff"
  "---------"
  $fullDiff
) | Set-Content $outputPath

Write-Output "Created: $outputPath"
