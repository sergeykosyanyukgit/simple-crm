FROM node:10.15.0

RUN mkdir -p /usr/src/app/dashboard
WORKDIR /usr/src/app/dashboard

COPY . ./

COPY ./build ./

COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 80
CMD ["npm", "run", "dev"]