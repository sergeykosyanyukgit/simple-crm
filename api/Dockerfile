FROM node:10.15.0

RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]