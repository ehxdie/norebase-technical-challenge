# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 7: Expose the application port
EXPOSE 5000

RUN npm install -g ts-node typescript

# Step 8: Set the command to run the app
CMD ["ts-node", "index.ts"]
