# Food Fit App with Genkit and Angular

![Food Fit App Cover](cover.png "Food Fit App Cover")

This is a Food Fit demo that uses Firebase Genkit to generate healthy recipes. This project uses [Angular](https://angular.dev/) for the frontend and [Genkit](https://firebase.google.com/docs/genkit) deployed on [Cloud Functions](https://firebase.google.com/docs/functions). For more information about how this application was created, check out this [blog post](https://lperezp.medium.com/food-fit-tu-partner-para-tener-una-alimentaci%C3%B3n-saludable-con-genkit-140d7cd25a22).

## Project Structure

```
food-fit/
├── food-fit-app/        # Angular frontend application
│   ├── public/          # Static assets
│   └── src/             # Source code
│       ├── app/         # Angular components
│       │   ├── components/  # Reusable components
│       │   ├── pages/       # Page components
│       │   └── services/    # Angular services
│       └── ...
└── server/              # Backend server code
    └── functions/       # Cloud Functions
        ├── lib/         # Compiled JavaScript
        └── src/         # TypeScript source
            └── schemas/ # API schemas
```

### Main Components

- **food-fit-app**: Angular application with the user interface
  - **components**: Reusable UI components like headers
  - **pages**: Main application pages (home, search, food list, details)
  - **services**: Data and API services

- **server/functions**: Firebase Cloud Functions with Genkit
  - **schemas**: Input and output data structures for the AI model

## Installation

To set up the project, follow these steps:

### Main Application

Navigate to the `food-fit-app` folder and run:

```
cd food-fit-app
npm install
```

### Cloud Functions

Navigate to the `server/functions` folder and run:

```
cd server/functions
npm install
```

## Usage

### Main Application

Navigate to the `food-fit-app` folder and run:

```
cd food-fit-app
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Cloud Functions

Follow the [guide](https://firebase.google.com/docs/genkit/cloud-run#make_api_credentials_available_to_deployed_flows) to generate the API KEY for deployment. Navigate to the `server/functions` folder and run:

```
cd server/functions
npm run serve
```

## Running Genkit Only

To run only Genkit, replace `GOOGLE_GENAI_API_KEY` in the `.env` file and run:

```
npm run genkit:dev
```

Generate an API key for the Gemini API using [Google AI Studio](https://aistudio.google.com/app/apikey).

## Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/lperezp/food-fit-app/pulls)

All contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for project guidelines. You can submit any ideas as [pull requests](https://github.com/lperezp/food-fit-app/pulls) or as [GitHub issues](https://github.com/lperezp/food-fit-app/issues).

If you want to contribute to the project, here are the basic steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [Apache License 2.0](LICENSE). You can use, modify, and distribute this code following the terms of the license.

## Author

- [Luis Eduardo](https://lperezp.dev/?utm_source=food-fit-app&utm_medium=readme&utm_campaign=food-fit-app&utm_id=github)

**Do you like food-fit-app? Give our repository a star :star: :arrow_up:.**