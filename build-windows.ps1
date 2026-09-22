# Requires GCC targeting Windows only on the developer's machine.
$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    gcc -Os -nostdlib -fno-stack-protector -mwindows '-Wl,--entry,WinMainCRTStartup' -o Neimark.exe launcher.c -lkernel32 -lshell32 -luser32
    if ($LASTEXITCODE -ne 0) { throw 'Windows launcher build failed' }
} finally { Pop-Location }

