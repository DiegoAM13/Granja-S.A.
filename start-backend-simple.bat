@echo off
echo Iniciando Backend Granja S.A. en puerto 8080...
echo.

cd /d "c:\Users\estiv\OneDrive\Documentos\GitHub\Programacion distribuida y paralela\Act2\GranjaSA\Back"

echo Verificando Java...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java no encontrado. Por favor instale Java 17 o superior.
    pause
    exit /b 1
)

echo.
echo Compilando y ejecutando aplicacion...
call mvnw.cmd clean spring-boot:run

echo.
echo Si el backend se inicia correctamente, estara disponible en:
echo http://localhost:8080
echo.
echo Endpoints disponibles:
echo - GET  http://localhost:8080/Clientes
echo - GET  http://localhost:8080/Porcino  
echo - GET  http://localhost:8080/Alimentacion
echo - GET  http://localhost:8080/Raza
echo - GET  http://localhost:8080/Reportes/clientes-porcinos
echo.
pause
