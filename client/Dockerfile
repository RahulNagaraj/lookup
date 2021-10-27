FROM node:10

WORKDIR /usr/app/lookup/client

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]