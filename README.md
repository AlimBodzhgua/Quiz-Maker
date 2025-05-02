# Quiz Maker

Full Stack web application to make diffrent quizzes with diffrent types of questions and share it with any users.
Frontend part of aplication made in React. <br />
Backend - ExpressJS with mongodb.

# List of technologies used
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [ChakraUI](https://v2.chakra-ui.com/)
- [Vite](https://vite.dev/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## How to run the project

### Requirements
To install and run the aplication you need [NodeJs](https://nodejs.org/en)

### Install Dependencies
```
$ npm install
```
### Create mongodb Cluster
This app is using mongodb, so you need to create your own [mongodb cluster](https://www.mongodb.com/docs/guides/atlas/cluster/) to use it 

### Create .env files
To use this app you should create .env file in client and server folder and put next env variables:

For Client folder:

VITE_SERVER_URL='http://localhost:4000' <br />
VITE_CLIENT_URL='http://localhost:3000' <br />

For Server folder:

PORT="4000" - here you can set post number. <br />
DB_PASSWORD="" - your db password here. <br />
JWT_SECRET="" - your jwt secret key (you can set any value). <br />
DATABASE="mongodb+srv://"username":<PASSWORD>@testconstuctorcluster.irsbj.mongodb.net/?retryWrites=true&w=majority&appName=TestConstuctorCluster" - put your cluster link and set your username instaed "username"  and put  <PASSWORD> keyword instead of password like in example. <br />

###  To run this app use: npm run start
Use npm run start in server and clien folder with 2 consoles and the same time.
