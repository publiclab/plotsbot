FROM node:8.9.0-stretch

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN cp -n ./config.json.sample ./config.json

EXPOSE 4000
CMD ["yarn", "start"]
