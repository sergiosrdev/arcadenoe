@echo off
echo Instalando dependencias...
call npm install

echo.
echo Gerando build para producao...
call npm run build

echo.
echo Build concluido! Os arquivos estao na pasta dist/
echo.
echo Para testar localmente:
echo   npx vite preview --port 5500
echo.
pause
