FROM node:8
  
RUN mkdir /src
COPY package.json /src
RUN npm install
WORKDIR /src
COPY . /src

CMD node index.js