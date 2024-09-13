FROM node:14.16.0-alpine3.13

WORKDIR /app/customer

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8001

CMD ["npm","start"]