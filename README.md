### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue2-project
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`.

## Technical Notes

This project follows a clean architecture approach with utilities and business logic separated from components. State management, debouncing, and other advanced features were intentionally not implemented as they weren't required in the project specification. The focus was on delivering a clean, maintainable codebase that meets the core requirements.

Various validation checks for search functionality and other features were not implemented, as this is a test project and such validations were not considered necessary within the scope of this assignment.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
