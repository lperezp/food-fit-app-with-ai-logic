# FoodFitApp

Una aplicación web desarrollada con Angular 19 que utiliza inteligencia artificial para generar recetas peruanas saludables y balanceadas. La aplicación aprovecha Firebase AI Logic con modelos Gemini para la generación de contenido y creación de imágenes de comida.

## Características

- 🍽️ **Generación de Recetas**: Obtén sugerencias de recetas peruanas saludables usando IA
- 🥬 **Búsqueda por Ingredientes**: Encuentra recetas basadas en ingredientes específicos
- 🖼️ **Generación de Imágenes**: Visualiza platos con imágenes generadas por IA
- 📱 **Diseño Responsive**: Interfaz optimizada para dispositivos móviles y desktop

## Tecnologías Utilizadas

- **Frontend**: Angular 19
- **IA y Backend**: Firebase AI Logic
  - Gemini para generación de texto y recetas
  - Imagen 4 (Gemini) para generación de imágenes de comida
- **Hosting**: Firebase Hosting

## Servidor de Desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve -o
```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

## Configuración del Proyecto

### Prerrequisitos

- Node.js (versión 18 o superior)
- Angular CLI (`npm install -g @angular/cli`)
- Cuenta de Firebase con acceso a AI Logic

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/lperezp/food-fit-app.git
cd food-fit-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno de Firebase en `src/environments/`:
   - `environment.ts` (desarrollo)
   - `environment.dev.ts` (producción)

### Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   └── header/         # Header de navegación
│   ├── core/
│   │   └── constants/      # Prompts de IA y constantes
│   ├── pages/              # Páginas principales
│   │   ├── home-page/      # Página de inicio
│   │   ├── list-food-page/ # Lista de recetas generadas
│   │   ├── search-page/    # Búsqueda por ingredientes
│   │   └── detail-food-page/ # Detalle de receta individual
│   └── services/
│       └── gen-ai.service.ts # Servicio de integración con Firebase AI Logic
```

## Construcción

Para construir el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción de producción optimiza tu aplicación para rendimiento y velocidad.

## Despliegue

Para desplegar en Firebase Hosting:

```bash
npm run deploy
```

Este comando construye la aplicación y la despliega automáticamente a Firebase Hosting.

## Firebase AI Logic

Esta aplicación utiliza Firebase AI Logic que proporciona:

### Modelos de IA Utilizados

- **Gemini**: Para generación de recetas y contenido de texto
- **Imagen 4 (Gemini)**: Para generación de imágenes de platos de comida

### Características de IA

- **Generación Estructurada**: Las recetas se generan con un esquema JSON definido que incluye:
  - Nombre y descripción del plato
  - Lista de ingredientes
  - Información nutricional (calorías, carbohidratos, grasas, etc.)
  - Tiempo de preparación y nivel de dificultad
  - Instrucciones paso a paso

- **Procesamiento Híbrido**: 
  - Preferencia por procesamiento en dispositivo cuando está disponible
  - Fallback a procesamiento en la nube con modelos Gemini

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run watch` - Construye en modo desarrollo con recarga automática
- `npm run deploy` - Construye y despliega en Firebase Hosting

## Recursos Adicionales

- [Documentación de Angular CLI](https://angular.dev/tools/cli)
- [Firebase AI Logic](https://firebase.google.com/docs/ai-logic)
- [Gemini AI](https://ai.google.dev/docs)

## Contribución

Si deseas contribuir al proyecto, por favor revisa las [pautas de contribución](../CONTRIBUTING.md).

## Licencia

Este proyecto está bajo la licencia especificada en el archivo [LICENSE](../LICENSE).
