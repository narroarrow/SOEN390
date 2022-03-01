FROM node:16
WORKDIR /app
COPY package*.json ./
COPY ./ ./
RUN npm i
RUN npm uninstall bcrypt
RUN npm i bcrypt
CMD ["npm", "start"]