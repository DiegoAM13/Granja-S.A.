# 🐷 Granja S.A. - Sistema de Gestión Porcina


Sistema completo de gestión para granja porcina desarrollado con **Spring Boot** (backend) y **Angular** (frontend). Interfaz moderna con identidad institucional del Politécnico Colombiano, paleta de colores verde, tipografía Poppins y funcionalidades CRUD completas.

## 🎯 Objetivos del Proyecto

✅ **CRUD Completo** (20 puntos):
- Gestión de Porcinos (Identificación, Raza, Edad, Peso, Alimentación, Cliente)
- Gestión de Clientes (Cédula, Nombres, Apellidos, Dirección, Teléfono)
- Gestión de Alimentación (Descripción, Dosis)

✅ **Reportes** (15 puntos):
- Reporte completo de clientes y porcinos
- Filtrado por cliente específico
- Estadísticas calculadas
- Exportación a CSV e impresión

## 🏗️ Arquitectura

### Backend (Spring Boot)
- **Puerto**: 8081
- **Base de datos**: PostgreSQL (principal) / H2 (testing)
- **Arquitectura**: Modelo por capas con clean code
- **Seguridad**: Spring Security (configurado para desarrollo)
- **API**: RESTful con documentación Postman

### Frontend (Angular)
- **Puerto**: 4200
- **Framework**: Angular 17+ con componentes standalone
- **UI**: Identidad institucional del Politécnico Colombiano
- **Logo**: Integración del logo institucional en todas las páginas
- **Footer**: Información académica con enlaces a GitHub
- **Tipografía**: Poppins profesional de Google Fonts
- **Iconos**: FontAwesome para consistencia visual
- **Diseño**: Responsive, moderno con paleta verde institucional

## 📁 Estructura del Proyecto

```
GranjaSA/
├── Back/                          # Backend Spring Boot
│   ├── src/main/java/com/Granja/Back/
│   │   ├── Controllers/           # Controladores REST API
│   │   │   ├── AlimentacionController.java
│   │   │   ├── AutenticacionController.java
│   │   │   ├── ClienteController.java
│   │   │   ├── PorcinoController.java
│   │   │   ├── RazaController.java
│   │   │   └── ReporteController.java
│   │   ├── Services/              # Lógica de negocio
│   │   ├── Repositories/          # Acceso a datos JPA
│   │   ├── Entities/              # Entidades de base de datos
│   │   ├── DTOS/                  # Objetos de transferencia
│   │   ├── Config/                # Configuración Spring Security
│   │   └── Mappers/               # Conversores Entity-DTO
│   ├── src/main/resources/
│   │   └── application.properties # Configuración PostgreSQL
│   ├── mvnw.cmd                   # Maven Wrapper Windows
│   └── pom.xml                    # Dependencias Maven
├── Frontend/                      # Frontend Angular 17+
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Componentes standalone
│   │   │   │   ├── alimentacion/  # Gestión de alimentación
│   │   │   │   ├── clientes/      # Gestión de clientes
│   │   │   │   ├── dashboard/     # Panel principal
│   │   │   │   ├── porcinos/      # Gestión de porcinos
│   │   │   │   └── reportes/      # Sistema de reportes
│   │   │   ├── services/          # Servicios HTTP
│   │   │   ├── models/            # Interfaces TypeScript
│   │   │   └── app.routes.ts      # Configuración de rutas
│   │   ├── assets/                # Recursos estáticos
│   │   │   └── Ingenieria.png     # Logo Politécnico Colombiano
│   │   └── styles.css             # Estilos globales
│   ├── angular.json               # Configuración Angular
│   ├── package.json               # Dependencias npm
│   └── tsconfig.json              # Configuración TypeScript
├── Base de datos/                 # Scripts SQL iniciales
│   └── GranjaS.A..sql            # Script de creación de BD
├── Postman/                       # Colecciones de testing
│   ├── Admin.postman_collection.json
│   ├── Alimentacion.postman_collection.json
│   ├── Clientes.postman_collection.json
│   └── Porcino.postman_collection.json
├── start-backend-simple.bat      # Script de inicio rápido
├── Casos de uso.drawio           # Documentación UML
├── Diagrama relacional.simp      # Modelo de datos
└── README.md                     # Este archivo
```

## 🚀 Instalación y Ejecución

### 📋 Prerrequisitos del Sistema

#### Requerimientos Obligatorios:
- **Java 17+** - [Descargar desde Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Node.js 18+** - [Descargar desde nodejs.org](https://nodejs.org/)
- **PostgreSQL 12+** - [Descargar desde postgresql.org](https://www.postgresql.org/download/)
- **Maven 3.6+** - [Descargar desde Apache Maven](https://maven.apache.org/download.cgi) (opcional, incluido con proyecto)
- **Git** - [Descargar desde git-scm.com](gh repo clone DiegoAM13/Granja-S.A.)

#### Verificar Instalaciones:
```bash
# Verificar Java
java -version

# Verificar Node.js y npm
node --version
npm --version

# Verificar Maven
mvn --version

# Verificar Git
git --version
```

### 📥 Clonar el Repositorio
```bash
git clone https://github.com/DiegoAM13/Granja-S.A..git
cd GranjaSA
```

### 🗄️ Configuración de Base de Datos

#### PostgreSQL (Configuración Principal)
El proyecto está configurado para usar **PostgreSQL** como base de datos principal:

1. **Instalar PostgreSQL 12+**:
   - Windows: [Descargar desde postgresql.org](https://www.postgresql.org/download/windows/)
   - Linux: `sudo apt-get install postgresql postgresql-contrib`
   - macOS: `brew install postgresql`

2. **Crear base de datos**:
```sql
CREATE DATABASE granja;
```

3. **Configuración actual** (`Back/src/main/resources/application.properties`):
```properties
# Configuración PostgreSQL (Activa)
spring.datasource.url=jdbc:postgresql://localhost:5432/granja
spring.datasource.username=postgres
spring.datasource.password=postgre
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

**📝 Nota**: Las tablas se crean automáticamente gracias a Hibernate. El script SQL en `/Base de datos/` es de referencia.

### 🖥️ Ejecución del Backend

#### Método 1: Script Automático (Recomendado)
```bash
# Desde la raíz del proyecto
.\start-backend-simple.bat
```

#### Método 2: Maven Manual
```bash
cd Back
.\mvnw.cmd spring-boot:run
# O en Linux/Mac: ./mvnw spring-boot:run
```

#### Método 3: Maven Directo
```bash
cd Back
mvn clean install
mvn spring-boot:run
```

**✅ El backend estará disponible en:** http://localhost:8081

### 🌐 Ejecución del Frontend

```bash
# Navegar a la carpeta Frontend
cd Frontend

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el servidor de desarrollo
npm start
```

**✅ El frontend estará disponible en:** http://localhost:4200

## 🔧 Configuración

### ⚙️ Configuraciones del Sistema

#### Backend Configuration
```properties
# Servidor
server.port=8081

# PostgreSQL Database (Configuración Actual)
spring.datasource.url=jdbc:postgresql://localhost:5432/granja
spring.datasource.username=postgres
spring.datasource.password=postgre
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false

# CORS y Seguridad
spring.security.enabled=false (para desarrollo)
```

#### Frontend Configuration
```json
{
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "port": 4200,
      "host": "localhost"
    }
  },
  "assets": [
    "src/favicon.ico",
    "src/assets"
  ]
}
```

#### CORS y Seguridad
- Backend configurado para aceptar requests desde `http://localhost:4200`
- Spring Security deshabilitado para desarrollo
- Endpoints públicos para facilitar testing
- PostgreSQL como base de datos principal

## 📊 Funcionalidades

### Dashboard
- Estadísticas generales (total porcinos, clientes, peso promedio)
- Accesos rápidos a funcionalidades principales
- Información del sistema

### Gestión de Porcinos
- ✅ Crear porcino con validaciones
- ✅ Listar todos los porcinos
- ✅ Actualizar información
- ✅ Eliminar porcino
- 🔗 Relaciones con Cliente, Raza y Alimentación

### Gestión de Clientes
- ✅ CRUD completo
- ✅ Validación de formularios
- ✅ Búsqueda y filtrado

### Gestión de Alimentación
- ✅ Tipos de alimentación
- ✅ Control de dosis
- ✅ Descripción detallada

### Reportes Avanzados
- 📈 Reporte general de clientes y porcinos
- 🔍 Filtrado por cliente específico
- 📊 Estadísticas calculadas automáticamente
- 📄 Exportación a CSV
- 🖨️ Función de impresión
- 📱 Diseño responsive

## 🗃️ Modelo de Datos

### Entidades Principales
- **Porcino**: Identificación, edad, peso + relaciones
- **Cliente**: Información personal y contacto
- **Alimentación**: Tipo, descripción, dosis
- **Raza**: York (1), Hampshire (2), Duroc (3)

### Relaciones
- Porcino → Cliente (Many-to-One)
- Porcino → Raza (Many-to-One)
- Porcino → Alimentación (Many-to-One)

## 🔌 API Endpoints

### Porcinos
- `GET /Porcino` - Listar porcinos
- `POST /Porcino/Guardar` - Crear porcino
- `PUT /Porcino/Actualizar/{id}` - Actualizar porcino
- `DELETE /Porcino/Eliminar/{id}` - Eliminar porcino

### Clientes
- `GET /Clientes` - Listar clientes
- `POST /Clientes/Guardar` - Crear cliente
- `PUT /Clientes/Actualizar/{cedula}` - Actualizar cliente
- `DELETE /Clientes/Eliminar/{cedula}` - Eliminar cliente

### Alimentación
- `GET /Alimentacion` - Listar alimentación
- `POST /Alimentacion/Guardar` - Crear alimentación
- `PUT /Alimentacion/Actualizar/{tipo}` - Actualizar alimentación
- `DELETE /Alimentacion/Eliminar/{tipo}` - Eliminar alimentación

### Reportes
- `GET /Reportes/clientes-porcinos` - Reporte completo
- `GET /Reportes/clientes-porcinos/{cedula}` - Reporte por cliente

## 🎨 Características de UI/UX

### 🏛️ Identidad Institucional
- **Logo Politécnico**: Logo oficial del Politécnico Colombiano Jaime Isaza Cadavid integrado en todas las páginas
- **Posicionamiento**: Esquina superior derecha junto a los títulos de página
- **Interactividad**: Efectos hover con escalado suave (scale 1.05)
- **Responsive**: Tamaño adaptable (60px altura) con bordes redondeados

### 🎓 Footer Académico
- **Información Institucional**: "2025 - Politécnico Colombiano Jaime Isaza Cadavid"
- **Créditos Desarrolladores**: 
  - Diego Mejía - [GitHub: DiegoAM13](https://github.com/DiegoAM13)
  - Rafael Uribe - [GitHub: EstivenUribe](https://github.com/EstivenUribe)
- **Profesor**: [Hernando Recamán Chaux](https://github.com/hrecaman) - GitHub enlazado
- **Enlaces Funcionales**: Todos los enlaces abren en nueva pestaña
- **Print-Friendly**: Footer oculto automáticamente al imprimir reportes

### 🎯 Diseño Moderno y Profesional
- **Paleta Verde Institucional**: Gradientes (#2d5016, #4a7c59) coherentes con identidad
- **Tipografía Poppins**: Fuente profesional de Google Fonts en todo el sistema
- **Iconos FontAwesome**: Consistencia visual profesional
- **Diseño Responsive**: Adaptable a móviles, tablets y desktop
- **Efectos Visuales**: Gradientes CSS, sombras y transiciones suaves

### 🖱️ Interactividad y Experiencia
- **Navegación Intuitiva**: Sidebar con iconos, estados activos y hover effects
- **Botones Interactivos**: Efectos hover con elevación (-2px translateY)
- **Cards Modernas**: Elevación al hover (-5px translateY) con sombras dinámicas
- **Formularios Validados**: Validación en tiempo real con feedback visual
- **Tablas Dinámicas**: Hover effects y botones de acción funcionales
- **Logo Interactivo**: Hover con escalado suave para mejor UX

## 🧪 Testing

### Postman
Colecciones incluidas para probar todos los endpoints:
- `Admin.postman_collection.json`
- `Clientes.postman_collection.json`
- `Porcino.postman_collection.json`
- `Alimentacion.postman_collection.json`

## 📈 Cumplimiento de Requisitos

### ✅ CRUD (20 puntos)
- **Porcinos**: Create, Read, Update, Delete completo
- **Clientes**: CRUD con validaciones
- **Alimentación**: Gestión completa de tipos

### ✅ Reportes (15 puntos)
- **Reporte General**: Todos los clientes y porcinos
- **Reporte Filtrado**: Por cliente específico
- **Estadísticas**: Cálculos automáticos
- **Exportación**: CSV y impresión

### ✅ Tecnologías Implementadas
- **Angular 17+**: Frontend moderno con componentes standalone
- **Spring Boot 3**: Backend robusto con REST API
- **PostgreSQL 12+**: Base de datos relacional principal
- **TypeScript**: Tipado fuerte en frontend
- **Bootstrap 5**: Framework CSS responsive
- **FontAwesome**: Sistema de iconos profesional
- **Maven**: Gestión de dependencias backend
- **npm**: Gestión de dependencias frontend

## 🚀 Guía de Inicio Rápido

### Pasos para Ejecutar el Proyecto:

1. **Verificar prerrequisitos**:
   ```bash
   java -version    # Debe ser 17+
   node --version   # Debe ser 18+
   npm --version    # Incluido con Node.js
   ```

2. **Clonar y navegar al proyecto**:
   ```bash
   git clone https://github.com/DiegoAM13/Granja-S.A..git
   cd GranjaSA
   ```

3. **Iniciar el Backend** (Opción más fácil):
   ```bash
   .\start-backend-simple.bat
   ```
   ✅ Backend disponible en: http://localhost:8081

4. **Iniciar el Frontend**:
   ```bash
   cd Frontend
   npm install
   npm start
   ```
   ✅ Frontend disponible en: http://localhost:4200

5. **¡Listo!** Acceder a la aplicación en el navegador

### 🔍 Verificación de Funcionamiento:
- ✅ Backend PostgreSQL funcionando en puerto 8081
- ✅ Frontend Angular funcionando en puerto 4200  
- ✅ Logo institucional visible en todas las páginas
- ✅ Footer académico con enlaces funcionales
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Navegación fluida entre módulos 
- ✅ CRUD completo: Porcinos, Clientes y Alimentación
- ✅ Sistema de reportes con filtros
- ✅ Exportación a CSV e impresión
- ✅ Responsive design en dispositivos móviles

---

## 🎓 Información Académica

### **Institución**
**Politécnico Colombiano Jaime Isaza Cadavid**  
Facultad de Ingeniería Informática

### **Asignatura**
**Programación Distribuida y Paralela**

### **Profesor**
**Hernando Recamán Chaux**  
📧 hrecaman@elpoli.edu.co | 🔗 [GitHub: hrecaman](https://github.com/hrecaman)

### **Estudiantes Desarrolladores**

**Diego Alejandro Mejía Giraldo**  
- 📧 Email: diego_mejia82211@elpoli.edu.co  
- 🔗 [GitHub: DiegoAM13](https://github.com/DiegoAM13)  
- 👨‍💻 Especialización: Backend Spring Boot & Base de Datos

**Rafael Estiven Uribe Álvarez**  
- 📧 Email: rafael_uribe95132@elpoli.edu.co  
- 🔗 [GitHub: EstivenUribe](https://github.com/EstivenUribe)  
- 👨‍💻 Especialización: Frontend Angular & UI/UX Design

---

## 📋 Cumplimiento de Objetivos Académicos

### ✅ **Implementación Técnica Completa**
- **Arquitectura por Capas**: Separación clara entre Controllers, Services, Repositories
- **API RESTful**: Endpoints bien definidos con métodos HTTP apropiados
- **Base de Datos Relacional**: PostgreSQL con relaciones entre entidades
- **Frontend Moderno**: Angular 17 con componentes standalone
- **Responsive Design**: Adaptable a múltiples dispositivos

### ✅ **Mejores Prácticas de Desarrollo**
- **Clean Code**: Código limpio y bien documentado
- **Patrones de Diseño**: DTO, Repository, Service Layer
- **Control de Versiones**: Git con commits descriptivos
- **Testing**: Colecciones Postman para pruebas de API
- **Documentación**: README completo y detallado

### ✅ **Identidad Institucional**
- **Logo Oficial**: Integrado en todas las interfaces
- **Footer Académico**: Créditos institucionales y desarrolladores
- **Paleta Institucional**: Verde representativo de la institución
- **Profesionalismo**: Diseño acorde a estándares universitarios

---

## 🌟 Características Destacadas del Proyecto

### 🏗️ **Arquitectura Robusta**
- Backend escalable con Spring Boot 3
- Frontend modular con Angular 17+
- Base de datos PostgreSQL optimizada
- Separación clara de responsabilidades

### 🎨 **Diseño Profesional**
- Identidad visual institucional completa
- Experiencia de usuario intuitiva
- Responsive design multiplataforma
- Efectos visuales modernos y atractivos

### 📊 **Funcionalidades Avanzadas**
- Sistema de reportes con estadísticas
- Exportación de datos a CSV
- Filtros dinámicos de información
- Validación de formularios en tiempo real

### 🔒 **Calidad y Seguridad**
- Validaciones both frontend y backend
- Manejo de errores robusto
- Configuración de CORS apropiada
- Base de datos con integridad referencial

---

**© 2025 - Politécnico Colombiano Jaime Isaza Cadavid**  
*Sistema completo desarrollado aplicando las mejores prácticas de ingeniería de software y tecnologías modernas para la gestión integral de Granja S.A.*
