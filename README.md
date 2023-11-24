# Instruction on how to run project locally

# Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)

## Getting started:

- Clone the repository

```
git clone https://github.com/abdullah-mumin/assignment_2.git
```

- Install dependencies

```
cd <project_name>
npm install
```

- Configure your Mongodb server

```
# Go to  [MongoDb Atlas](https://www.mongodb.com/atlas/database)
# Signin with your account and go to Database Access section, create a database with built-in Atlas admin role. Also remember your user-name and password.
# Create a .env file and do the following

DATABASE_URL= mongodb+srv://<username>:<password>@cluster0.f0ilt.mongodb.net/?retryWrites=true&w=majority
PORT=5000
BCRYPT_SALT_ROUNDS=10

#replece <username> and <password> with your username and password.

```

- Build and run the project

```
npm run build
npm run start:dev
```
