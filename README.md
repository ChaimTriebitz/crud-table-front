# Vito

A React-based CRM for managing lender and bank contact data.

## What it does

- Browse banks and lenders
- Search and sort table data
- Add, edit and remove records
- Import data from Excel
- View record details in dialogs
- Responsive layout for smaller screens
- Login and registration

## Stack

- React 18
- React Router
- SCSS
- Axios
- XLSX
- Render

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The app expects the API URLs configured in `src/config.js`.

## Project structure

- `src/cmps` - reusable UI components
- `src/pages` - Banks and Lenders pages
- `src/controllers` - API requests
- `src/data` - table and form configuration
- `src/state` - global application state
- `src/styles` - SCSS styles

## Deployment

The frontend is deployed on Render.
