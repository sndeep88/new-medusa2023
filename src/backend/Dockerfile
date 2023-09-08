FROM node:18.15.0

EXPOSE 9000

WORKDIR /app/medusa


RUN mkdir -p /app/medusa/static
RUN mkdir -p /app/medusa/uploads/images

COPY package*.json ./

RUN rm -rf node_modules

RUN apt-get update

RUN apt-get install -y python

# RUN npm install -g npm@latest

RUN npm install -g @medusajs/medusa-cli@latest

COPY . .

COPY develop.sh .

ENTRYPOINT ["./develop.sh", "develop"]
