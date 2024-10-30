# Norebase Technical Challenge

This is a TypeScript-based backend project that uses MongoDB as the database and Docker for containerization. The project also includes Jest for unit testing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   
   git clone https://github.com/ehxdie/norebase-technical-challenge
   

3. Install the dependencies:

   
   cd your-project
   npm install


4. Set up the environment variables:

   Create a .env file in the root of the project and add the following variables:

   
   MONGO_URI=mongodb://your-mongodb-connection-string
   PORT=5000
   

5. Start the development server:

   
   ts-node index.ts
   

   The server will start running on http://localhost:5000/api/articles`.

## Usage

The project provides the following endpoints:


- GET /api/articles/:articleId/likes: Retrieves the number of likes an article has.
- POST /api/articles/:articleId/like: Posts a like to an article.


You can use a tool like Postman or cURL to interact with the API.

## Testing

The project uses Jest for unit testing. To run the tests:

npx jest

This will execute all the tests and display the results.

## Docker

The project includes a Dockerfile to build a Docker image. To build the image:

docker build -t your-project.

To run the Docker container:

docker run -p 5000:5000 your-project

The container will start running the backend application.

## License

This project is licensed under the [MIT License](LICENSE).
`;
