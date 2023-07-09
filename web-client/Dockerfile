# Stage 1: Build the React application
FROM node:14 as build

WORKDIR /app
COPY package*.json ./


# Install all the dependencies
RUN npm install

COPY . ./

# Inject the environment variables into the build
ARG REACT_APP_AUTH_BACK_END
ARG REACT_APP_REST_BACK_END
ENV REACT_APP_AUTH_BACK_END=$REACT_APP_AUTH_BACK_END
ENV REACT_APP_REST_BACK_END=$REACT_APP_REST_BACK_END

# Build the application
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:1.19.0-alpine as serve

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
