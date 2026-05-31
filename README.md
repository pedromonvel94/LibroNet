# 📘 README — Libronet Frontend

## 🚀 Requisitos previos

- Node.js v18 o superior
- pnpm (gestor de paquetes recomendado en este proyecto)

```bash
npm install -g pnpm
```

---

## 📦 Dependencias principales

El proyecto usa React + Vite + React Router DOM:

```bash
pnpm add react@18 react-dom@18 react-router-dom@6
```

## 🛠️ Dependencias de desarrollo

Para que Vite compile correctamente con React:

```bash
pnpm add -D vite @vitejs/plugin-react
```

---

## 📂 Estructura del proyecto

```
libronet-frontend-completo/
├─ node_modules/
├─ proyecto/
│  ├─ src/
│  │  ├─ main.jsx
│  │  ├─ App.jsx
│  │  ├─ components/
│  │  │  ├─ Navbar.jsx / Navbar.css
│  │  │  ├─ Badge.jsx / Badge.css
│  │  │  ├─ Loader.jsx / Loader.css
│  │  │  ├─ ConfirmDialog.jsx / ConfirmDialog.css
│  │  │  ├─ FuncionarioDetail.jsx / FuncionarioDetail.css
│  │  │  ├─ FuncionarioForm.jsx / FuncionarioForm.css
│  │  │  └─ FuncionarioTable.jsx / FuncionarioTable.css
│  │  ├─ pages/
│  │  │  ├─ HomePage.jsx / HomePage.css
│  │  │  ├─ LoginPage.jsx
│  │  │  ├─ RegisterPage.jsx
│  │  │  ├─ AuthPage.css
│  │  │  ├─ FuncionariosPage.jsx / FuncionariosPage.css
│  │  │  ├─ FuncionarioDetailPage.jsx
│  │  │  ├─ FuncionarioCreatePage.jsx
│  │  │  └─ FuncionarioEditPage.jsx
│  │  ├─ services/
│  │  │  ├─ authService.js
│  │  │  ├─ funcionarioService.js
│  │  │  └─ catalogoService.js
│  │  ├─ hooks/
│  │  │  ├─ useFuncionario.js
│  │  │  ├─ useFuncionarios.js
│  │  │  └─ useCatalogos.js
│  │  └─ styles/
│  │     └─ global.css
│  └─ index.html
├─ package.json
├─ pnpm-lock.yaml
└─ vite.config.js
```

---

## ⚙️ Configuración de Vite

Archivo `vite.config.js` en la raíz del proyecto:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'proyecto',   // index.html está dentro de /proyecto
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // puerto de Spring Boot
        changeOrigin: true,
      }
    }
  }
});
```

> ⚠️ El bloque `proxy` es obligatorio para que las llamadas a `/api/auth` y `/api/funcionarios` lleguen al backend. Sin él, las páginas cargan pero los datos no se obtienen.

---

## 📜 Scripts en package.json

Asegúrate de tener:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## ▶️ Pasos para ejecutar

**1. Instalar dependencias:**

```bash
pnpm install
```

**2. Levantar servidor de desarrollo:**

```bash
pnpm dev
```

👉 Se abrirá en `http://localhost:5173/`

**3. Compilar para producción:**

```bash
pnpm build
```

**4. Previsualizar build:**

```bash
pnpm preview
```

---

## 🗺️ Rutas disponibles

| Ruta | Página |
|------|--------|
| `/` | Página de inicio |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario |
| `/funcionarios` | Lista de funcionarios |
| `/funcionarios/nuevo` | Crear funcionario |
| `/funcionarios/:id` | Detalle de funcionario |
| `/funcionarios/:id/editar` | Editar funcionario |

> ⚠️ Las rutas son **case-sensitive**. Usa siempre minúsculas, por ejemplo `/funcionarios` y no `/Funcionarios`.

---

## 🔗 Conexión con el backend

El frontend consume los siguientes endpoints de Spring Boot:

| Servicio | Endpoint |
|----------|----------|
| Login | `POST /api/auth/login` |
| Registro | `POST /api/auth/registro` |
| Listar funcionarios | `GET /api/funcionarios` |
| Obtener funcionario | `GET /api/funcionarios/{id}` |
| Crear funcionario | `POST /api/funcionarios` |
| Actualizar funcionario | `PUT /api/funcionarios/{id}` |
| Eliminar funcionario | `DELETE /api/funcionarios/{id}` |
| Catálogo estados civiles | `GET /api/catalogos/estados-civiles` |
| Catálogo tipos documento | `GET /api/catalogos/tipos-documento` |
| Catálogo formaciones | `GET /api/catalogos/formaciones` |

---

## ✅ Checklist rápido para el equipo

- [ ] Node.js v18+ instalado (`node -v`)
- [ ] pnpm instalado (`pnpm -v`)
- [ ] Dependencias instaladas (`pnpm install`)
- [ ] `vite.config.js` con el bloque `proxy` apuntando al puerto de Spring Boot
- [ ] Backend corriendo en `http://localhost:8080` antes de probar login/registro
- [ ] Usar rutas en minúscula en el navegador (`/funcionarios`, `/login`, `/registro`)
- [ ] Si hay pantalla en blanco: abrir F12 → Console y revisar errores en rojo

---

## 🔎 Solución de problemas comunes

**Pantalla en blanco al entrar a una ruta:**
Abre F12 → Console. Si hay un error de componente no encontrado, verifica que todos los archivos estén en las carpetas correctas según la estructura de arriba.

**Las páginas cargan pero no aparecen datos:**
Verifica que el proxy esté configurado en `vite.config.js` y que el backend esté corriendo. Reinicia `pnpm dev` después de modificar `vite.config.js`.

**Error 404 al recargar una página:**
Es normal en desarrollo con React Router. Usa siempre la navegación interna (botones/links) en lugar de recargar directamente desde el navegador en rutas distintas a `/`.
