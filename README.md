# 📘 LibroNet — Sistema de Gestión y Control de Accesos Seguro

LibroNet es una aplicación web fullstack desarrollada para la gestión de funcionarios y usuarios del sistema, incorporando buenas prácticas de desarrollo seguro mediante autenticación basada en tokens JWT (JSON Web Tokens) y control de accesos basado en Roles (RBAC).

---

## 📂 Estructura Detallada del Proyecto

El repositorio está estructurado de forma ordenada para separar la lógica de servidor y de cliente:

```text
libronet/
├─ libronet-backend/             # Código del Servidor (Spring Boot)
│  ├─ src/main/java/com/libronet/libronet/
│  │  ├─ Config/
│  │  │  ├─ ApplicationConfig.java # Beans de configuración (AuthManager, PasswordEncoder, etc.)
│  │  │  └─ SecurityConfig.java    # Filtros y reglas de acceso de Spring Security
│  │  ├─ Controller/
│  │  │  ├─ AuthController.java    # Endpoints públicos de login y registro
│  │  │  ├─ UserController.java    # Endpoints de administración de usuarios (ADMIN)
│  │  │  ├─ FuncionarioController.java # Endpoints de gestión de funcionarios
│  │  │  └─ CatalogoController.java # Endpoints auxiliares para dropdowns
│  │  ├─ Model/
│  │  │  └─ User.java             # Entidad User (JPA) que implementa UserDetails
│  │  ├─ Service/
│  │  │  ├─ AuthService.java      # Lógica de registro, login y generación de tokens
│  │  │  └─ JwtService.java       # Generación, firma y validación de tokens JWT
│  │  ├─ dao/
│  │  │  ├─ UserDAO.java / UserDAOImp.java # Acceso a datos para usuarios
│  │  │  └─ FuncionarioDAO.java / FuncionarioDAOImp.java # Acceso a datos para funcionarios
│  │  └─ dto/
│  │     ├─ AuthResponse.java     # Contenedor de respuesta de autenticación (token, nombre, rol)
│  │     ├─ LoginRequest.java     # Contenedor de datos de inicio de sesión (correo, contrasena)
│  │     └─ RegisterRequest.java  # Contenedor de datos de registro (nombre, correo, contrasena, rol)
│  └─ pom.xml                    # Configuración de dependencias Maven (Spring Boot, Security, JJWT, PostgreSQL, Lombok)
│
├─ libronet-frontend/            # Código del Cliente (React + Vite)
│  ├─ proyecto/                  # Código fuente de la SPA
│  │  ├─ index.html              # Archivo HTML raíz
│  │  ├─ src/
│  │  │  ├─ main.jsx             # Punto de entrada de React
│  │  │  ├─ App.jsx              # Enrutador de la aplicación
│  │  │  ├─ components/          # Componentes reutilizables
│  │  │  │  ├─ Navbar.jsx / Navbar.css # Navegación dinámica según el rol
│  │  │  │  ├─ Badge.jsx / Badge.css   # Etiquetas para estados y roles
│  │  │  │  ├─ Loader.jsx / Loader.css   # Cargando/Skeletons de tablas
│  │  │  │  ├─ ConfirmDialog.jsx / ConfirmDialog.css # Confirmación de de baja lógica
│  │  │  │  └─ FuncionarioTable.jsx / FuncionarioTable.css # Tabla de funcionarios
│  │  │  ├─ pages/               # Vistas de la aplicación
│  │  │  │  ├─ HomePage.jsx / HomePage.css # Pantalla de inicio
│  │  │  │  ├─ LoginPage.jsx     # Inicio de sesión
│  │  │  │  ├─ RegisterPage.jsx  # Formulario de registro (exclusivo ADMIN)
│  │  │  │  ├─ UsersPage.jsx     # Panel de gestión de usuarios (exclusivo ADMIN)
│  │  │  │  ├─ FuncionariosPage.jsx # Panel de funcionarios
│  │  │  │  └─ AuthPage.css      # Estilos comunes de autenticación
│  │  │  ├─ services/           # Clientes HTTP (llamadas API)
│  │  │  │  ├─ authService.js    # Login y Registro (envía token de Admin)
│  │  │  │  ├─ userService.js    # CRUD de usuarios (envía token de Admin)
│  │  │  │  ├─ funcionarioService.js # CRUD de funcionarios (envía token)
│  │  │  │  └─ catalogoService.js # Catálogos dinámicos (envía token)
│  │  │  └─ styles/
│  │  │     └─ global.css        # Diseño global del sistema
│  ├─ package.json               # Dependencias del frontend (React, Vite, React Router DOM)
│  ├─ pnpm-lock.yaml             # Lockfile de pnpm
│  └─ vite.config.js             # Configuración del servidor de desarrollo y proxy a localhost:8080
```

---

## 🛠️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* **Java Development Kit (JDK) 17** o superior.
* **Maven** (para la gestión de dependencias del backend).
* **PostgreSQL** (base de datos relacional).
* **Node.js v18** o superior junto con **pnpm** (o npm tradicional).

---

## 🗄️ Configuración y Ejecución del Backend

### 1. Configurar la Base de Datos
Crea una base de datos en PostgreSQL llamada `libro_net`.
Ajusta las credenciales de conexión en [application.properties](file:///c:/Users/user/Documents/Development/2025/IUDigital/Semestre%204/Bloque%202/Desarrollo%20de%20software%20seguro/libronet/libronet-backend/src/main/resources/application.properties):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/libro_net
spring.datasource.username=tu_usuario_postgres
spring.datasource.password=tu_contrasena_postgres
spring.jpa.hibernate.ddl-auto=update
```

### 2. Semilla/Bootstrap de Base de Datos (Primer Administrador)
Dado que el endpoint de creación de usuarios (`/api/auth/registro`) está **restringido solo para usuarios con rol ADMIN**, necesitas crear el primer administrador directamente en la base de datos para poder iniciar sesión por primera vez.

Ejecuta la siguiente sentencia SQL en tu consola de PostgreSQL o cliente gráfico (pgAdmin/DBeaver):

```sql
INSERT INTO users (nombre, correo, contrasena, rol, estado)
VALUES (
    'Administrador Inicial', 
    'admin@libronet.com', 
    'contraseña',
    'ADMIN', 
    'ACTIVO'
);
```
> 🔑 **Credenciales iniciales:**
> * **Usuario:** `admin@libronet.com`
> * **Contraseña:** `contraseña`

### 3. Ejecutar el Backend
Desde la terminal, navega a la carpeta del backend y levanta la aplicación:

```bash
cd libronet-backend
mvn spring-boot:run
```
La API estará disponible en `http://localhost:8080`.

---

## 💻 Configuración y Ejecución del Frontend

### 1. Instalar Dependencias
Desde la terminal, navega a la carpeta del frontend e instala las librerías:

```bash
cd libronet-frontend
pnpm install
# o con npm: npm install
```

### 2. Ejecutar en Modo Desarrollo
Inicia el servidor local de desarrollo de Vite:

```bash
pnpm dev
# o con npm: npm run dev
```
La aplicación se abrirá automáticamente en `http://localhost:5173/`.

---

## 🔒 Arquitectura de Seguridad (JWT y Roles)

La aplicación utiliza un filtro interceptor personalizado en el backend ([JwtAuthenticationFilter](file:///c:/Users/user/Documents/Development/2025/IUDigital/Semestre%204/Bloque%202/Desarrollo%20de%20software%20seguro/libronet/libronet-backend/src/main/java/com/libronet/libronet/Jwt/JwtAuthenticationFilter.java)) que extrae el token Bearer del encabezado HTTP y autentica al usuario.

### Matriz de Permisos (Roles)

| Módulo / Acción | ADMIN | RRHH | Anónimo |
|:---|:---:|:---:|:---:|
| Iniciar Sesión (`/login`) | ✅ | ✅ | ✅ |
| Listar Funcionarios | ✅ | ✅ | ❌ (403) |
| Crear / Editar / Borrar Funcionarios | ✅ | ❌ (403) | ❌ (403) |
| Ver Lista de Usuarios (`/usuarios`) | ✅ | ❌ (Redirección) | ❌ (Redirección) |
| Editar / Desactivar Usuarios | ✅ | ❌ (403) | ❌ (403) |
| Registrar Nuevo Usuario (`/registro`) | ✅ | ❌ (Redirección) | ❌ (Redirección) |

---

## 🔗 Endpoints del Backend

| Servicio | Método | Ruta | Acceso |
|:---|:---:|:---|:---|
| Login | `POST` | `/api/auth/login` | Público |
| Registro de usuario | `POST` | `/api/auth/registro` | ADMIN |
| Listar funcionarios | `GET` | `/api/funcionarios` | ADMIN, RRHH |
| Crear funcionario | `POST` | `/api/funcionarios` | ADMIN |
| Editar funcionario | `PUT` | `/api/funcionarios/{id}` | ADMIN |
| Eliminar funcionario | `DELETE` | `/api/funcionarios/{id}` | ADMIN |
| Listar usuarios | `GET` | `/api/users` | ADMIN |
| Editar usuario (rol/estado) | `PUT` | `/api/users/{id}` | ADMIN |
| Eliminar usuario (lógico) | `DELETE` | `/api/users/{id}` | ADMIN |
| Cargar catálogos | `GET` | `/api/catalogos/**` | ADMIN, RRHH |

---

## 🔎 Solución de Problemas Comunes

* **Error 403 Forbidden al consumir funcionarios/usuarios:** Asegúrate de haber iniciado sesión. El token JWT se almacena localmente en el navegador y es inyectado de manera automática en las peticiones.
* **Borrado Lógico:** La eliminación de usuarios utiliza *Soft Delete*. Al eliminar un usuario en la tabla de usuarios, su estado cambia a `INACTIVO` previniendo la pérdida de historial de llaves foráneas.
* **El servidor no conecta con el backend:** Revisa tu archivo `vite.config.js` y valida que el bloque `proxy` apunte correctamente al puerto de Spring Boot (por defecto `http://localhost:8080`).
