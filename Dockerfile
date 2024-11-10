# Use Node.js 22 as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Set the default command to run migrations, seeds, and start the app
CMD sh -c "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"