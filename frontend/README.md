# Ecolio Fornt-End Client Deployment

Create a virtual environment under the root project directory:

**Windows/macOS/Linux:**

```bash
npm install
```

Create a `.env` file under the root project directory and populate it with the following content:

```bash
REACT_APP_AUTH0_DOMAIN=AUTH0-DOMAIN
REACT_APP_AUTH0_CLIENT_ID=AUTH0-CLIENT-ID
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:4040/callback
REACT_APP_API_SERVER_URL=http://localhost:8000
REACT_APP_AUTH0_AUDIENCE=AUTH0-AUDIENCE
```

Run the project in development mode:

```bash
npm start
```

You can now visit http://localhost:8000/ to access the application.