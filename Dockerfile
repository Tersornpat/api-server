# Use an official Node.js runtime as the base image
FROM alpine

# Set the working directory in the container
WORKDIR /app

# Install the specified npm version globally
RUN apk add --update nodejs npm git ncdu fish tree bat

# Clone the GitHub repository into the container
RUN git clone -b server https://github.com/Tersornpat/api-server.git

# Navigate into the cloned repository directory
WORKDIR /app/api-server

# Install dependencies using npm
RUN npm install

# Expose any required ports for the application
EXPOSE 3030

# Set the default command to run when the container starts
CMD ["npm", "start"]
