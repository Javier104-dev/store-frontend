# React Vite Template

Template for building Web Apps using React + Vite.

# Requirements

- Node.js 22 or higher

# Features

- React 18
- TypeScript
- Vite 4
- TailwindCSS
- React Router DOM 6
- React Query (TanStack Query)
- Formik + Yup for form handling
- JWT Authentication support
- Analytics integration (GA4 & Microsoft Clarity)
- React Toastify for notifications
- ESLint + Prettier
- Husky
- lint-staged
- editorconfig
- Playwright with code coverage
- Environment variables management

# Setup

> ⚠️ We recommend using [Visual Studio Code](https://code.visualstudio.com/) as well as the extensions for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for development.

1. `npm ci` to install dependencies
2. `npm run dev:prepare` to copy contents of `.env.dist` into a `.env` file and populate it
3. `npm run test:install` to install Playwright dependencies

# Environment Variables

All environment variables must be prefixed with `VITE_`. For example:

- `VITE_API_BASE_URL`: For API endpoints
- `VITE_GA_MEASUREMENT_ID`: For Google Analytics
- `PORT`: For development server port (defaults to 5173)

# Available Scripts

Development and Production:

```
npm run start:dev
# Start development server

npm run start:prod
# Start production preview

npm run start:test
# Start in test mode

npm run build
# Create production build
```

Testing:

```
npm run test
# Run tests with coverage

npm run test:ui
# Run tests with UI

npm run test:coverage
# Generate coverage report
```

Code Quality:

```
npm run lint
# Run ESLint

npm run format
# Run Prettier
```

# Deploy

### Prerequisites

- Coolify API Tokens, create one for "Customer Prod" and "Customer Staging" in https://sre.bigger.systems/security/api-tokens, when you create the token please click the `root` checkbox.
- GitHub Personal Access Token, you can create one in https://github.com/settings/tokens, when you create the token please click the `repo` checkbox.
- Fill the .env file with the correct values.

### Steps to deploy

1. Run the command `npm run deploy`
2. Follow the prompts to select the project, server, environment, and deployment type.
3. Once the deployment is finished, you will see the URL of the deployed application.

# Docker

### Building the Image

To build the Docker image, run:

```bash
docker build -t react-vite-app .
```

### Running the Container

To run the container locally:

```bash
docker run -p 4173:4173 react-vite-app
```

The application will be available at `http://localhost:4173`

### Environment Variables

When running the container, you can pass environment variables using the `-e` flag:

```bash
docker run -p 4173:4173 -e VITE_API_BASE_URL=https://api.example.com react-vite-app
```

# Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Shared components
├── configs/        # Configuration files
├── hooks/          # Custom React hooks
├── interfaces/     # TypeScript interfaces
├── layouts/        # Layout components
├── pages/          # Route pages
├── services/       # API services
├── types/          # TypeScript types
└── utils/          # Utility functions
```

# Page Module Structure

Each page module follows this structure for better organization:

```
└── 📁example-page
    ├── 📁components/     # Page-specific components
    ├── 📁hooks/         # Page-specific hooks
    ├── 📁services/      # Page-specific services
    ├── 📁types/         # Page-specific types
    ├── 📁context/       # (optional) Page-specific context
    ├── 📁utils/         # (optional) Page-specific utilities
    └── ExamplePage.tsx  # Main page component
```

# References

- [React docs](https://react.dev/learn)
- [Vite docs](https://vitejs.dev/guide/)
- [React Router docs](https://reactrouter.com/en/main)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [Playwright docs](https://playwright.dev/docs/intro)
- [Formik docs](https://formik.org/docs/overview)
- [Tailwind docs](https://tailwindcss.com/docs)
