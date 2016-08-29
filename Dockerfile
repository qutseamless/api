FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .
RUN npm i --production

COPY source .
RUN npm run build && rm -rf source && mv build .

EXPOSE 3000

CMD ["node", "main" , "3000", "mongo"]
