FROM node:18.19.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Expose the development server port
EXPOSE 4200

CMD ["npm", "start"]
