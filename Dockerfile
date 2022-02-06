ARG NODE_VERSION
FROM node:${NODE_VERSION}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD ["nest build && npm run migrations:run && cross-env NODE_ENV=production nest start"]
