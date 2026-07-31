# truceCheck - Weekly Class Registration System

A simple web application for managing weekly class registrations. Built with vanilla HTML/CSS/JS frontend and Netlify Functions backend with Netlify Blobs for persistent storage.

## Features

- **User Registration** - Students can register with name, email, and phone
- **Class Listing** - View available weekly classes with schedule
- **User Dashboard** - View all registered users in a table
- **Auto-seeding** - Test data is automatically seeded on deployment

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Netlify Functions (Node.js)
- **Storage**: Netlify Blobs (built-in persistent storage)
- **Deployment**: Netlify

## Project Structure

```
├── frontend/
│   ├── index.html          # Home/Dashboard
│   ├── register.html       # User Registration page
│   ├── classes.html        # Available Classes page
│   ├── dashboard.html      # User list page
│   ├── css/
│   │   └── style.css       # Global styles
│   └── js/
│       ├── api.js          # Shared API helper
│       ├── register.js     # Registration form logic
│       ├── classes.js      # Classes display logic
│       └── dashboard.js    # User list logic
├── netlify/
│   └── functions/
│       ├── register-user.js  # POST - Register user
│       ├── get-users.js      # GET  - List users
│       └── get-classes.js    # GET  - Static classes
├── scripts/
│   └── seed.js             # Seeds test data on deploy
├── netlify.toml            # Netlify deployment config
├── package.json
└── README.md
```

## Local Development

### Prerequisites
- Node.js 18+
- Netlify CLI (`npm install -g netlify-cli`)

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd cohort-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npx netlify dev
   ```

4. Open `http://localhost:8888` in your browser.

## Deployment

### Deploy to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Connect your repository to Netlify:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select the repository

3. Netlify will automatically detect the build settings from `netlify.toml`:
   - Build command: `npm run build` (runs the seed script)
   - Publish directory: `frontend`
   - Functions directory: `netlify/functions`

4. No environment variables are needed for basic setup.

### Deploy via Netlify CLI

```bash
npx netlify deploy --prod
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register-user` | Register a new user |
| GET | `/api/get-users` | Get all registered users |
| GET | `/api/get-classes` | Get static class list |

## Seed Data

The seed script (`scripts/seed.js`) runs automatically during deployment and populates the database with 8 sample users. It only seeds if the database is empty, so existing data is preserved on redeploys.