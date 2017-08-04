function GetHostName_V1{
	param ([string] $FilePath)

	$FilePath -split "\\" | Where {  $_ -ne ""  } | Select -first 1
}

function GetHostName_V2{
	param ([string] $FilePath)

	$FilePath -match "\\\\(.*?)\\" | Out-Null
	
	if($Matches.Count -ge 2)
	{
		return $Matches[1]
	}

} 

function GetHostName_V3{
	param ([string] $FilePath)

	if ($FilePath -match "\\\\(.*?)\\" -eq $TRUE)
	{
		return $FilePath -split "\\" | Where {  $_ -ne ""  } | Select -first 1
	}
}

function GetHostName_V4{
	param ([string] $FilePath)

	$FilePath | select-string -pattern "\\\\(.*?)\\" -AllMatches | ForEach {$_.Matches} | ForEach {$_.Groups} | Select-Object -skip 1 -first 1

}

function GetHostName_V5{
	param ([string] $FilePath)
	
	$FilePath | select-string -pattern "(?<=\\\\).*?(?=\\)" | Select -ExpandProperty Matches | Select -ExpandProperty Value

}