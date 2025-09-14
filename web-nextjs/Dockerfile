FROM node:lts-alpine

# Install git for commitlint
RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]