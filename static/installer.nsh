!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Iodine" "Software\Clients\StartMenuInternet\Iodine\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine" "" "Iodine HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\Application" "AppUserModelId" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\Application" "ApplicationIcon" "$INSTDIR\Iodine.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\Application" "ApplicationName" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\Application" "ApplicationCompany" "Iodine"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\DefaultIcon" "DefaultIcon" "$INSTDIR\Iodine.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Iodine\shell\open\command" "" '"$INSTDIR\Iodine.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Iodine" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Iodine" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine" "" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\DefaultIcon" "" "$INSTDIR\Iodine.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser, Free and open source."
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities" "ApplicationName" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities" "ApplicationIcon" "$INSTDIR\Iodine.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities\FileAssociations" ".htm" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities\FileAssociations" ".html" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities\URLAssociations" "http" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities\URLAssociations" "https" "Iodine"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\Capabilities\StartMenu" "StartMenuInternet" "Iodine"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine\shell\open\command" "" "$INSTDIR\Iodine.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Iodine"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Iodine"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Iodine"
!macroend