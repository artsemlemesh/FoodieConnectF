# Use an official Node.js image as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (default Vite dev server port)
EXPOSE 3001

# Run the application in development mode
CMD ["yarn", "dev", "--host"]