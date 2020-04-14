# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /package.json
COPY ./public/ ./public/
COPY ./tsconfig.json ./tsconfig.json
COPY ./src/ ./src/
COPY .env /.env
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# start app
CMD ["npm", "start"]

EXPOSE 3000