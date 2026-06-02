# Frontend Dockerfile
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar configuración personalizada de nginx si es necesario (opcional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
