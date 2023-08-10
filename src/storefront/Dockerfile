FROM node:18.15.0

EXPOSE 8000

WORKDIR /app/storefront

COPY package*.json ./

RUN rm -rf node_modules

RUN apt-get update

RUN npm install -g npm@latest

RUN npm install -g next-cli

COPY . .

# COPY --chmod=777 develop.sh .

# ENTRYPOINT ["./develop.sh", "develop"]
COPY --chmod=777 develop.sh .

RUN chmod +x ./develop.sh

# RUN npm install

# RUN npm run build &> /dev/null

# npm run $1 --host
# RUN npm run develop

# ENTRYPOINT ["npm", "run", "develop"]
# ENTRYPOINT ["npm", "run", "start"]
# ENTRYPOINT ["./develop.sh", "start"]
ENTRYPOINT ["./develop.sh", "develop"]