FROM node:8
  
RUN mkdir /src
COPY package.json /src
WORKDIR /src
RUN npm install
COPY . /src

CMD node index.js
