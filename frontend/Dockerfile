# ==== BUILD =====
# Use a Node 16 base image
FROM node:16-alpine as build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build

# ==== RUN =======
# Use a smaller base image for the final stage
FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy only the necessary files from the build stage
COPY --from=build /app/build ./build
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Install serve
RUN npm install -g serve
# Start the app
CMD serve -s build
