# WTWR (What to Wear?): Back End

This project is a backend application designed to manage and store data efficiently while providing a robust API for client applications. Built with Node.js and Express.js, it serves as a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on the database. The application is ideal for projects requiring secure and scalable data handling, and it’s been designed to be modular, making it easy to expand or integrate with frontend applications.

This backend is connected to a MongoDB database, where all data is stored in collections. Postman was used extensively during development to test and validate each endpoint, ensuring reliable and consistent responses. The API is designed with clean, well-defined routes and comprehensive error handling, providing a stable experience for users and developers alike.

Technologies and Techniques Used
Node.js & Express.js: Node.js provides the JavaScript runtime environment, while Express.js serves as the web framework, allowing for rapid development and management of server-side logic. Express.js enables easy creation of RESTful routes and middleware functions for security, validation, and error handling.

MongoDB: MongoDB, a NoSQL database, is used for data storage. Its flexible schema design allows for quick iteration and scaling of the data structure as the application grows. The MongoDB database is accessed using Mongoose, an Object Data Modeling (ODM) library, which provides schema validation and simpler interaction with the MongoDB collections.

Postman: Postman was utilized for API testing. Each route was tested to verify its response structure, accuracy, and error-handling capabilities. Postman collections helped ensure that each API endpoint worked as expected before being deployed, reducing the likelihood of bugs in production.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
