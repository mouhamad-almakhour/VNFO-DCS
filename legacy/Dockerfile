# Specify a base image
FROM node:22.12-alpine

WORKDIR /backend

# Specify a working directory inside the Docker container where your code will be placed
COPY package*.json ./

RUN npm install -g npm@latest && npm ci


# Copy the rest of your application files (excluding node_modules)
COPY . .

# Expose port 8080 default port 3000
EXPOSE 3000


CMD ["npm", "start"]
