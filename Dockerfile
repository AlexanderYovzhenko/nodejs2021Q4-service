ARG NODE_VERSION
FROM node:${NODE_VERSION}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD ["npm", "start"]
