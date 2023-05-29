# ux-web-exam

# Setup
## Docker
In the root of the project, run `docker compose up`. Now you should
have a frontend listening on port 3000 localhost, and a backend listening
on port 4000. Go to `http://localhost:3000` to see the frontend and `http://localhost:4000/api-docs/#/` to see the swagger api doc.

## Setup without docker
In /backend, run `npm install`. Then run `npm run dev` to start the backend on port 4000.
In /frontend, run `npm install`. Then run `npm run dev` to start the frontend on port 3000.
Go to `http://localhost:3000` to see the frontend and `http://localhost:4000/api-docs/#/` to see the swagger api doc.

### Prerequisites
Install Node: >= 14.17
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install NPM: >= 8.5.1
```
sudo apt-get install npm
```
# Prisma
If there is no dev.db file in /backend/prisma or the schema.prisma has changed, run `npx prisma db push` in the /backend folder, to push or update to the database create a database file. 


