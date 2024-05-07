# Connectify

Connectify is a full-stack social media app that allows users to connect and interact with each other.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [License](#license)

## Features

- [x] Sign up and login using JWT for authentication
- [x] User profile creation and management
- [x] Post creation
- [x] Commenting on posts
- [x] Liking posts
- [x] View users who liked a particular post
- [x] Light and Dark mode
- [x] Following/Unfollowing users

## Technologies

- React.js
- Redux
- Node.js
- Express.js
- MongoDB
- Tailwind CSS

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB or MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/tarek-gritli/connectify.git
```

2. Go to the project directory and install dependencies for both the client and server

```bash
cd client
npm install
```

```bash
cd server
npm install
```

3. Create a `.env` file in the `server` directory and add the environment variables as shown in the `.env.example` files.
4. Start the server

```bash
cd server
npm start
```

5. Start the client

```bash
cd client
npm run dev
```

## License

This project is licensed under the MIT License.
