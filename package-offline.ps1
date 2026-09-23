$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$stage = Join-Path ([IO.Path]::GetTempPath()) ('neimark-package-' + [guid]::NewGuid().ToString('N'))
$files = Join-Path $stage 'files'
New-Item -ItemType Directory -Path $files -Force | Out-Null
$assets = @('index.html','style.css','lecture.css','app.js','i18n.js','presentation.js','navigation.js','physics.js','physics.test.cjs','README.md','Neimark.exe','launcher.c','build-windows.ps1','package-offline.ps1','alexander.png','svetlana.jpg','vmk-logo.png','msu-logo.png')
foreach ($asset in $assets) { Copy-Item -LiteralPath (Join-Path $root $asset) -Destination $files }
$start = @'
<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Осциллятор Неймарка — запуск</title><meta http-equiv="refresh" content="0;url=files/index.html">
<style>body{font:20px/1.6 system-ui,sans-serif;background:#0b121a;color:#f8fafc;max-width:700px;margin:12vh auto;padding:24px}a{color:#d0f58a}small{color:#c9d5df}</style>
</head><body><h1>Осциллятор Неймарка</h1><p><a href="files/index.html">Открыть проект / Open project →</a></p><p>Распакуйте архив целиком. Папка <b>files</b> должна находиться рядом с этим файлом.</p><small>Extract the complete ZIP. Keep the files folder next to this launcher.</small></body></html>
'@
[IO.File]::WriteAllText((Join-Path $stage 'Осциллятор неймарка.html'), $start, [Text.UTF8Encoding]::new($false))
Compress-Archive -LiteralPath (Join-Path $stage 'Осциллятор неймарка.html'),$files -DestinationPath (Join-Path $root 'neimark-oscillator.zip') -Force
Write-Output "Archive: $(Join-Path $root 'neimark-oscillator.zip')"
Write-Output "Preview: $stage"
