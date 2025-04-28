# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias incluyendo las de desarrollo
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"] 