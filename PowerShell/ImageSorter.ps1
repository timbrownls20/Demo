param
(
 [string]$FilePath = "C:\Users\tbrown\Pictures"
)

# dictionary with the image identifiers
$images = @{"jpg" = "FFD8"; gif = "474946"; "bmp" = "424D"; png = "89504E470D0A1A0A"}

# Get all files (not directories) under a given path
Get-ChildItem $FilePath | ? { !$_.PSIsContainer } | % {

 $ImageFilePath = $_.FullName
 $FileHeader = ""

 # Get the first 8 bytes of the file as a hex string
 Get-Content $ImageFilePath -First 8 -Encoding Byte | % {
  $FileHeader = $FileHeader + $_.ToString("X2")
 }

 # test each image type in the dictionary
 $images.GetEnumerator() | % {

  if($FileHeader.StartsWith($_.Value))
  {
   # we identified the file type. Create a directory if needed and move
   Write-Host($ImageFilePath + " is a " + $_.Key)
   $ImageDirectory = Join-Path $FilePath $_.Key
   New-Item -ItemType Directory -Force -Path $ImageDirectory
   Move-Item $ImageFilePath $ImageDirectory
  }
 }
}