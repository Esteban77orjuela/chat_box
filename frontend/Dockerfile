# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app
# Install dependencies
COPY frontend/package*.json ./
RUN npm ci
# Copy source and build
COPY frontend/ ./
RUN npm run build

# ----- Runtime image -----
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
