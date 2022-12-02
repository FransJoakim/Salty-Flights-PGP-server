FROM node:18-alpine
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

ENV NODE_ENV production
ENV PORT 5500
ENV HOST 0.0.0.0

CMD ["npm", "start"]