FROM node:lts-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV production
RUN npm install --${NODE_ENV}
COPY . .
CMD ["npm", "start"]
