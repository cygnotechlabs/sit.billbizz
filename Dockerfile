# Docker Backend

# # Use the official Node.js image as base
# FROM node:20.12.2
 
# # Set the working directory in the container
# WORKDIR /app
 
# # Copy package.json and package-lock.json
# COPY package*.json ./
 
# # Install dependencies
# RUN npm install
 
# # Install PM2 globally
# RUN npm install -g pm2
 
# # Copy the rest of the application
# COPY . .
 
# # Expose the port the app runs on
# EXPOSE 5000
 
# # Command to run the backend server with PM2
# CMD ["pm2-runtime", "start", "server.js", "--name", "gvf-backend"]








#Docker Frontend

# # Use the official Node.js image as base
# FROM node:20.12.2 as build
 
# # Set the working directory in the container
# WORKDIR /app
 
# # Copy package.json and package-lock.json
# COPY package*.json ./
 
# # Install dependencies
# RUN npm install
 
# # Copy the rest of the application
# COPY . .
 
# # Build the application
# RUN npm run build
 
# # Stage 2: Serve frontend with a lightweight HTTP server
# FROM nginx:alpine
 
# # Copy the build output to serve from Nginx
# COPY --from=build /app/dist /usr/share/nginx/html
 
# # Copy custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf
 
 
# # Expose port 4173
# EXPOSE 4173
 
# # Command to run nginx
# CMD ["nginx", "-g", "daemon off;"]









#nginx.conf

# server {
#     listen 4173;
#     server_name localhost;
 
#     root /usr/share/nginx/html;
 
#     location / {
#         try_files $uri $uri/ /index.html;
#     }
 
#     error_page 404 /index.html;
# }