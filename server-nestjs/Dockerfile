FROM node:lts-alpine

# Install git for commitlint
RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]