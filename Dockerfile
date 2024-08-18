# 1. Use an official Node.js runtime as the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# 4. Install the dependencies
RUN npm install

# 5. Copy the rest of the application to the working directory
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose the port the app will run on
EXPOSE 3000

# 8. Start the Next.js app
CMD ["npm", "start"]
