# FotoGo - Landing Page de Lista de Espera

## Descripción

Este proyecto es una landing page para la lista de espera de FotoGo, una red social de fotografía donde los usuarios pueden participar en retos diarios y ganar premios reales. La aplicación permite a los usuarios registrarse en la lista de espera para obtener acceso anticipado y bonificaciones especiales.

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Firebase (Firestore)
- Lucide React (iconos)

## Estructura del Proyecto

```
├── public/               # Archivos estáticos
├── src/                  # Código fuente
│   ├── components/       # Componentes React
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Configuración de bibliotecas (Firebase)
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── .env                  # Variables de entorno (no incluido en git)
├── index.html            # Plantilla HTML
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```

## Configuración de Desarrollo

### Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   ```

### Ejecución en Desarrollo

```bash
npm run dev
# o
yarn dev
```

### Construcción para Producción

```bash
npm run build
# o
yarn build
```

## Despliegue

Este proyecto está configurado para ser desplegado en Netlify. Se incluyen los siguientes archivos de configuración:

- `netlify.toml`: Configuración principal de Netlify
- `public/_redirects`: Configuración de redirecciones para SPA
- `public/robots.txt`: Control de acceso para motores de búsqueda
- `public/sitemap.xml`: Mapa del sitio para SEO

### Pasos para Desplegar en Netlify

1. Crea una cuenta en Netlify
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket
3. Configura las variables de entorno en la configuración del sitio en Netlify
4. Despliega el sitio

## Características

- Diseño responsive con Tailwind CSS
- Formulario de registro para la lista de espera
- Integración con Firebase Firestore para almacenar registros
- Estadísticas en tiempo real de usuarios registrados
- Animaciones y efectos visuales atractivos
- SEO optimizado con metaetiquetas

## Licencia

Este proyecto es propiedad de FotoGo. Todos los derechos reservados.