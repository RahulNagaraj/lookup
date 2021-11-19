FROM node:10

WORKDIR /usr/app/lookup/server

COPY package*.json ./

RUN npm install nodemon -g

COPY . ./

RUN npm install

# Default command
EXPOSE 8000

CMD ["npm", "start"]