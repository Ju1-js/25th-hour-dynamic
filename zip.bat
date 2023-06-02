@echo off
del ".\Export\25th.Hour.Dynamic.zip"
"C:\Program Files\7-Zip\7z.exe" a -tzip -mx9 .\Export\25th.Hour.Dynamic.zip .\Dynamic\*
