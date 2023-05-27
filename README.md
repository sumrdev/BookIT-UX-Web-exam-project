# ux-web-exam

# Setup
In the root of the project, run `docker compose up`. Now you should
have a frontend listening on port 3000 localhost, and a backend listening
on port 4000.

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

### Running NPM commands
Go to `/backend` and run: `npx prisma db push`.
Now run `npm install`. Finally to run it do `npm run dev`,
and go to `http://localhost:3000/api-docs/#/` for the swagger api doc

