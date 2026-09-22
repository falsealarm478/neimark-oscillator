/* Native Windows launcher. Uses only Windows system DLLs, no C runtime. */
#include <windows.h>
#include <shellapi.h>
void WINAPI WinMainCRTStartup(void) {
    static WCHAR path[32768];
    DWORD n=GetModuleFileNameW(NULL,path,32768);
    if(!n || n>=32750) ExitProcess(1);
    while(n && path[n-1]!=L'\\') --n;
    const WCHAR file[]=L"index.html";
    for(DWORD i=0;i<sizeof(file)/sizeof(WCHAR);++i)path[n+i]=file[i];
    if(GetFileAttributesW(path)==INVALID_FILE_ATTRIBUTES){
        MessageBoxW(NULL,L"Extract the complete ZIP first. Keep Neimark.exe next to index.html and the other project files.",L"Neimark oscillator",MB_OK|MB_ICONERROR);
        ExitProcess(1);
    }
    if((INT_PTR)ShellExecuteW(NULL,L"open",path,NULL,NULL,SW_SHOWNORMAL)<=32){
        MessageBoxW(NULL,L"Open index.html in a modern web browser (Edge, Chrome, Firefox or Safari).",L"Neimark oscillator",MB_OK|MB_ICONERROR);
        ExitProcess(1);
    }
    ExitProcess(0);
}

