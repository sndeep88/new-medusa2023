FROM node:18.15.0


WORKDIR /app/admin

COPY package*.json ./

RUN rm -rf node_modules

RUN apt-get update

RUN npm install -g npm@latest

COPY . .


# COPY --chmod=777 develop.sh .

RUN npm install

RUN npm run build &> /dev/null

EXPOSE 7000
# ENTRYPOINT ["./develop.sh", "develop"]

CMD [ "npm", "run", "dev", "--", "--host"]
# CMD [ "npm", "run", "serve", "--", "--host"]

# ENTRYPOINT ["npm", "run", "dev"]