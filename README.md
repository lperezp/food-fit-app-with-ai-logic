# Food Fit App with Firebase AI Logic & Angular

![Cover Food Fit App](cover.png "Cover Food Fit App")

This is a Food Fit demo that uses Firebase AI Logic to generate healthy  recipes. This project uses [Angular](https://angular.dev/) for the frontend and [Firebase AI Logic](https://firebase.google.com/docs/ai-logic) with Gemini models for AI-powered content generation. The app specializes in creating personalized healthy recipes with nutritional information and AI-generated food images.

# Features

- 🍽️ **AI-Powered Recipe Generation**: Get personalized healthy  recipe suggestions
- 🥬 **Ingredient-Based Search**: Find recipes based on specific ingredients you have
- 🖼️ **AI Image Generation**: Visualize dishes with AI-generated food images
- 📱 **Responsive Design**: Optimized for both mobile and desktop devices
- 📊 **Nutritional Information**: Complete nutritional breakdown for each recipe

# Installation

To set up the project, follow these steps:

## Prerequisites

- Node.js (version 18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Firebase account with AI Logic access

## Application Setup

Go to the `food-fit-app` folder and run the following command:

```bash
cd food-fit-app
npm install
```

Configure your Firebase environment variables in `src/environments/`:
- `environment.ts` (development)
- `environment.dev.ts` (production)

# Usage

## Development Server

Go to the `food-fit-app` folder and run the following command:

```bash
cd food-fit-app
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building for Production

To build the project for production:

```bash
cd food-fit-app
ng build
```

## Deployment

Deploy to Firebase Hosting:

```bash
cd food-fit-app
npm run deploy
```

# Firebase AI Logic Integration

This application leverages Firebase AI Logic with the following models:

## AI Models Used

- **Gemini**: For recipe generation and structured content creation
- **Imagen 4**: For AI-generated food images

## AI Features

- **Structured Recipe Generation**: Recipes are generated with a defined JSON schema including:
  - Recipe name and description
  - Ingredient lists
  - Nutritional information (calories, carbohydrates, fats, etc.)
  - Preparation time and difficulty level
  - Step-by-step instructions

- **Hybrid Processing**: 
  - Preference for on-device processing when available
  - Cloud-based fallback with Gemini models

- **Image Generation**: Creates appetizing food images for each recipe using Imagen models

# Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/lperezp/food-fit-app/pulls)

I welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/lperezp/food-fit-app/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/lperezp/food-fit-app/pulls) or as [GitHub issues](https://github.com/lperezp/food-fit-app/issues).

# Author

- [Luis Eduardo](https://lperezp.dev/?utm_source=food-fit-app&utm_medium=readme&utm_campaign=food-fit-app&utm_id=github)

**Love food-fit-app? Give our repo a star :star: :arrow_up:.**