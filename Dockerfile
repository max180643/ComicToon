FROM node:15.13.0-alpine

WORKDIR /app
COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "production"]