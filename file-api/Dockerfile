FROM node:10.15.0

RUN mkdir -p /usr/src/app/file-api
WORKDIR /usr/src/app/file-api

COPY package*.json ./

RUN npm install

EXPOSE 80
CMD ["npm", "run", "dev"]