# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Expose the API port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]