# Challenge-Week-17
A tutorial that explains how a specific regular expression, or regex, functions by breaking down each part of the expression and describing what it does. 

# Social Network API

## Description

This is a RESTful API for a social networking web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The API uses a NoSQL database which allows for flexible data representation and quick queries even with large amounts of unstructured data.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository from GitHub:
git clone https://github.com/JerryChowMX/Challenge-Week-18.git

2. Navigate to the project directory:
cd Challenge-Week-18

3. Install the required npm packages:
npm install

4. Start the server:
npm start


## Usage

Once the server is running, you can use API testing tools like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to interact with the API.

### API Endpoints

- `GET /api/users`: Retrieves all users.
- `POST /api/users`: Create a new user.
- `GET /api/users/:userId`: Retrieves a single user by ID along with their thoughts and friend list.
- `PUT /api/users/:userId`: Update a user by ID.
- `DELETE /api/users/:userId`: Delete a user by ID.
- `POST /api/users/:userId/friends/:friendId`: Add a friend to the user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from the user's friend list.
- `GET /api/thoughts`: Retrieves all thoughts.
- `POST /api/thoughts`: Create a new thought.
- `GET /api/thoughts/:thoughtId`: Retrieves a single thought by ID.
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID.
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID.
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

For detailed examples of requests and responses, you can refer to the [walkthrough video](https://drive.google.com/file/d/1k1BJAxqIMG_cN72xpJ-gF5mI3noN1A0X/view).

## Models

The API uses the following Mongoose models:

- `User`: For user data including username, email, thoughts, and friends.
- `Thought`: For user's thoughts, including thought text and reactions
- `Reaction`: Used as a subdocument in Thought for reactions to thoughts.

## Features

- Uses the Mongoose package to connect to a MongoDB database.
- Includes User and Thought models with schema settings as per the challenge instructions.
- Features Reactions as the reaction field's subdocument schema in the Thought model.
- Utilizes a date library to format timestamps on queried data.

## Configuration
Create a .env file in the root directory of the project with the following contents for environment variables:
DB_URI=mongodb://localhost:27017/socialNetworkDB
PORT=3000

Replace the DB_URI value with your MongoDB connection string if it differs from the above default.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.