FROM node:12.4.0-alpine

WORKDIR /usr/server

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy app source code into docker image
COPY . .

CMD ["yarn", "run", "dev"]
