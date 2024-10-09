FROM node:20
WORKDIR /usr/src/raga/backend

COPY package*.json .
RUN npm i

COPY . .
CMD ["npm", "run", "build"]