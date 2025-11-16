Plant Store
Welcome to the Plant Store project! This is a comprehensive e-commerce platform for buying and selling a variety of plants, designed with a focus on a secure and scalable architecture.

Key Features
This application includes a robust set of features to handle both user and administrative functions:

User Authentication: Utilizes JWT (JSON Web Tokens) for secure user and admin authentication.

Admin-Only Registration: A secure backend with custom middlewares ensures that only authenticated administrators can register new admins.

Plant Management: The admin dashboard allows verified administrators to add new plants, including details like name, price, categories, and stock status.

Chatbot Integration: A chatbot is integrated to provide users with quick assistance and information about plants.

Shopping Cart: The backend is ready to support an add-to-cart feature, with frontend development in progress.

Fast Authentication: Redis is implemented to handle login and logout requests, providing a significant speed boost.

Content Management: The platform includes pagination and search functionality to efficiently browse a large inventory of plants.

Frontend: Built with React and Chakra UI for a modern, responsive user experience.

Technologies Used
Frontend:

React

React Router

Redux Toolkit

Chakra UI

Axios

Backend:

Node.js

Express.js

MongoDB with Mongoose

Zod (for schema validation)

Redis

JWT (JSON Web Tokens)

Getting Started
To get the project up and running locally, follow these steps:

Clone the repository.

Install backend dependencies in the backend directory:
npm install

Install frontend dependencies in the frontend directory:
npm install

Set up your environment variables for MongoDB, Redis, and JWT secrets.

Start the backend server:
npm start

Start the frontend development server:
npm run dev

Future Enhancements
Due to time constraints, some additional features could be added to further enhance the project, such as:

Full-fledged shopping cart functionality on the frontend.

User profiles and order history.

Payment gateway integration.

Dashboard for editing and deleting plants.

More advanced search and filter options.