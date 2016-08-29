FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app

ADD package.json .
RUN npm i --production
ADD build .

EXPOSE 3000

CMD ["node", "main" , "3000", "mongo"]
