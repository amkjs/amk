FROM node:8.9-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 4000
CMD ["npm", "start"]
