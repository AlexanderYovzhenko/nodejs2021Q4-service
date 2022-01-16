ARG NODE_VERSION
FROM node:${NODE_VERSION}
WORKDIR /usr/src/app
COPY package*.json ./
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN npm install --${NODE_ENV}
RUN npm install -g nodemon
COPY . .
ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD ["npm", "start"]
