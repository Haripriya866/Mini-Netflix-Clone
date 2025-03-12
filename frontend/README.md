# Title
Mini Netflix Clone

## Objective
* This project builds a mini Netflix clone using React to offer a responsive single-page movie discovery experience with search, filtering, and detailed views via the TMDB API.
* It leverages the Context API for state management and features responsive carousels for movies and cast details.

## Demo

Link: https://mini-netflix-clone-frontend.vercel.app

## Tech Stack
HTML, CSS, JS, ReactJS, React Router, React Context, Github, and vercel for hosting the repository.

### Functionality
* Provides a responsive single-page application with client-side routing between Home and MovieDetails pages.
* Uses the Context API for global state management and header functionality.
* Allows users to search for movies and filter by popular, top-rated, and upcoming categories via the TMDB API.
* Displays movie listings and cast details in responsive carousels using React Slick.
* Shows detailed movie information, including title, poster, release date, rating, overview, genres, and banner image.

## Setup Instructions
* Initial Setup: open root folder for project in vscode: cd Netflix Clone
* initialize git in this folder (Netflix Clone): git init

    Set Up the Frontend:

        Run the following command to generate a React app (npx create-react-app frontend)

        Navigate to the frontend folder:
        cd ../frontend

        Install the necessary dependencies:
        npm install react-slick slick-carousel react-router-dom@5 react-loader-spinner@4.0.0

    Folder Structure and Logic: Frontend:

        The src folder contains the main logic for the React application.
        Components for the project are created in the components/ folder within src.
    
    Running the Application:
        Start the Frontend:

            Navigate to the frontend folder:
            cd ../frontend
    
            Start the React development server:
            npm start


## Resources
## Design files
Home, MovieDetails

## APIS
* Fetch data from the TMDB API.

## Third party packages
react-loader-spinner, react-router-dom, react-slick, slick-carousel 