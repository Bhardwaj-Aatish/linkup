# Use a specific version for stability
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Next.js defaults to port 3000
EXPOSE 3000

# Correct CMD syntax: Executable followed by arguments
CMD ["npm", "start"]