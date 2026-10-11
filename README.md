# Vito — Banks & Lenders Directory


[![Frontend CI](https://github.com/ChaimTriebitz/crud-table-front/actions/workflows/ci.yml/badge.svg)](https://github.com/ChaimTriebitz/crud-table-front/actions/workflows/ci.yml)

![Vito dashboard preview](https://raw.githubusercontent.com/ChaimTriebitz/ct/master/public/projects/proj.crud-table.png)

Vito is a React-based table manager for organizing bank and lender relationships. It focuses on a practical workflow: scan records, search for a contact, update information, and keep the data organized in a structured table.

**Live app:** [vito-front.onrender.com](https://vito-front.onrender.com)  
**API health:** [vito-back.onrender.com/health](https://vito-back.onrender.com/health)  
**Backend source:** [crud-table](https://github.com/ChaimTriebitz/crud-table)

## Features

- Separate **Banks** and **Lenders** views
- Search lender records by contact or lender
- Filter bank rows by category
- Sort table data
- Add, edit, inspect, and remove records
- Register and log in with token-based authentication
- Restrict persistent record changes to the authenticated record owner
- Show record counts and distinguish local/demo rows from database-backed rows
- Spreadsheet parsing and bulk-insert helpers are present in the source; the import entry point still needs to be verified in the main UI before treating it as a finished user flow

## Tech stack

- React 18 and React Router
- Sass / SCSS
- Axios for API requests
- SheetJS (xlsx) for spreadsheet parsing
- Node.js, Express, MongoDB, and Mongoose in the companion API
- JWT authentication

## Local development

### Requirements

- Node.js and npm
- The [Vito API](https://github.com/ChaimTriebitz/crud-table)
- A MongoDB database configured for the API

### 1. Start the backend

Clone the backend repository, install dependencies, and create a local .env file using its .env.example:

~~~bash
npm install
npm start
~~~

The API listens on port 5000 by default. Confirm that MongoDB is connected by opening [http://localhost:5000/health](http://localhost:5000/health).

### 2. Start the frontend

Install dependencies and create .env from .env.example:

~~~bash
npm install
npm start
~~~

The React development server runs on port 3000 by default. The API base URL is configured with the build-time REACT_APP_BASE_URL environment variable:

~~~env
REACT_APP_BASE_URL=http://localhost:5000
~~~

Do not append /api to this value; the app adds the API path itself.

## Project structure

~~~text
src/
  cmps/          Shared UI, dialogs, auth, and table cells
  controllers/   API request helpers for create/read/update/delete
  data/          Table headers, filters, field definitions, and labels
  functions/     Shared filtering, sorting, formatting, and demo helpers
  hooks/         Form, dialog, global-state, and interaction hooks
  pages/         Banks and Lenders screens
  state/         Global application state and actions
~~~

The frontend and backend are separate repositories. The frontend reads the API base URL from the build-time REACT_APP_BASE_URL environment variable.

## Quality checks

~~~bash
npm test -- --watchAll=false
npm run build
~~~

GitHub Actions runs the test suite and production build for pushes to main and pull requests. Current unit tests cover the shared table filtering and sorting helpers.

## Known limitations and next steps

- Add integration tests for sign-in, row ownership, create/update/delete, and bulk import.
- Verify and connect the spreadsheet import entry point in the main UI.
- Keep demo records synthetic; do not commit real contact lists, exports, or customer notes.
- Review the live deployment in a private browser window before sharing it as a portfolio demo.
