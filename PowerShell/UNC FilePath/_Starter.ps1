. .\GetHostName1.ps1

$output = GetHostName_V1 -FilePath "\\CODEBUCKETSERVER1\wwwroot\WebSite\ImageDir" 
Write-Host "V1 UNC: $output"

$output = GetHostName_V1 -FilePath "C:\wwwroot\mediSIGHTSite3DevTest1" 
Write-Host "V1 Local: $output"

$output = GetHostName_V2 -FilePath "\\CODEBUCKETSERVER1\wwwroot\WebSite\ImageDir" 
Write-Host "V2 UNC: $output"

$output = GetHostName_V2 -filePath "C:\wwwroot\mediSIGHTSite3DevTest1" 
Write-Host "V2 Local: $output"

$output = GetHostName_V3 -FilePath "\\CODEBUCKETSERVER1\wwwroot\WebSite\ImageDir" 
Write-Host "V3 UNC: $output"

$output = GetHostName_V3 -FilePath "C:\wwwroot\mediSIGHTSite3DevTest1" 
Write-Host "V3 Local: $output"

$output = GetHostName_V4 -FilePath "\\CODEBUCKETSERVER1\wwwroot\WebSite\ImageDir" 
Write-Host "V4 UNC: $output"

$output = GetHostName_V4 -FilePath "C:\wwwroot\mediSIGHTSite3DevTest1" 
Write-Host "V4 Local: $output"

$output = GetHostName_V5 -FilePath "\\CODEBUCKETSERVER1\wwwroot\WebSite\ImageDir" 
Write-Host "V5 UNC: $output"

$output = GetHostName_V5 -FilePath "C:\wwwroot\mediSIGHTSite3DevTest1" 
Write-Host "V5 Local: $output"
