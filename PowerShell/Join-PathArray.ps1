function Join-ArrayPath
{
   param([parameter(Mandatory=$true)]
   [string[]]$PathElements) 

   if ($PathElements.Length -eq "0")
   {
     $CombinedPath = ""
   }
   else
   {
     $CombinedPath = $PathElements[0]
     for($i=1; $i -lt $PathElements.Length; $i++)
     {
     }
  }
  return $CombinedPath
}
