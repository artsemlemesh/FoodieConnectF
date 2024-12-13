# React + Vite

start project
 ```
yarn create vite
#install dependencies
yarn install
#run project
yarn dev
 ```

 ## Project setup
 1) delete all unnecessary files
 2)tailwind css setup

 3)added build and server configurations to vite.config.js
 4) added static.json file in advance for future deployment
 5)added .env file for enviroment variables
 6) added Procfile for deployment on heroku

 #modules
 # yarn add serve


 # added dockerfile


 1)add 
 ```
 "engines": {
    "node": ">=14.0.0"
  }
  ```
  to package.json to solve an error with yarn install
  # download node18-alpine first to the docker
  ```docker pull node:18-alpine```

  2) run 
  docker build -t my-react-app .

  3) startt container
  docker run -p 3001:3001 my-react-app

## storybook installation
1)    npx sb init
2)    yarn storybook

## created docker-compose.yml
1)set up the file
2)   docker-compose up --build
3) can run using
 ``` docker-compose up ```
 ## its crucial to download docker pull node:18-alpine first and then run docker compost up --build


<!-- # added lint, prepare scripts to package.json -->
# created folder structure

#added yarn add @tanstack/react-query

#set up quiery client in main.jsx

# added ``` react-hook-form yup @hookform/resolvers ``` for form handling
@storybook/addon-postcss

# add this to fix tailwind in stories
import '../src/index.css'; // Adjust the path to your Tailwind CSS file 

#downloaded 
reactstrap
for material pro react components
-didnt use much
# installed 
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material



# created login/registration in backend

# working on redux for frontend registration/login

start proj: 
# yarn dev
storybook:
yarn storybook


BACKEND:
test stripe locally
stripe listen --forward-to localhost:8000/cart/stripe/webhook/

and this in 3rd terminal: 
stripe trigger payment_intent.succeeded



# for order tracking
yarn add leaflet react-leaflet

add to tailwind.css : @import "leaflet/dist/leaflet.css";
