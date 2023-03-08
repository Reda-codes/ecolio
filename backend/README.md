# Ecolio: Ecolio Flask API Deployment
## Get the Auth0 domain and client ID

-  Open the Applications section of the Auth0 Dashboard.

-  Click on the Create Application button and fill out the form with the following values:

    -  Name: Hello World Client

    -  Application Type: Single Page Web Applications

- Click on the Create button.

### An Auth0 Application page loads up.

-  click on the "Settings" tab of your Auth0 Application page
-  locate the "Application URIs " section, and fill in the following values:
   -  Allowed Callback URLs: http://localhost:4040/callback
   -  Allowed Logout URLs: http://localhost:4040
   -  Allowed Web Origins: http://localhost:4040
- Scroll down and click the "Save Changes" button.

### locate the "Basic Information" section.
Under The application settings You will find **"Domain"** and **"Client ID"**
<br>
<br>
<br>
## Get the MOngoDb Database Url

- Go To mongoDb and create an account(for free)
- Create a sahred new cluster It's For Free
- Once The cluster is created click connect
- Choose connect your application
- create user
- A popup will show up with the **"URL"** (Remember to replace the password)
<br>
<br>
<br>
## Run the Project

Create a virtual environment under the root project directory:

**macOS/Linux:**

```bash
python3 -m venv venv
```

**Windows:**

```bash
py -3 -m venv venv
```

Activate the virtual environment:

**macOS/Linux:**

```bash
. venv/bin/activate
```

**Windows:**

```bash
venv\Scripts\activate
```

Install the project dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file under the root project directory and populate it with the following content:

```bash
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
AUTH0_API_TOKEN=
MONGODB_CONNECTION=
```

Run the project in development mode:

```bash
flask run
```