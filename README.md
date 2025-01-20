# bite
$env:Path += ";$($env:APPDATA)\npm"
ionic build
ionic cap sync android       
ionic serve