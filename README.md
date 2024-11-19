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

  2) run 
  docker build -t my-react-app .

  3) startt container
  docker run -p 3001:3001 my-react-app

