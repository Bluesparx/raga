FROM node:20
WORKDIR /usr/src/raga/frontend

COPY package*.json .
RUN npm i

COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]