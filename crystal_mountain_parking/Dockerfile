FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

USER node
CMD ["npm", "start"]
