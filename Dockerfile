FROM node:lts-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN npm install --${NODE_ENV}
COPY . .
ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD ["npm", "start"]
