FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm ci

COPY apps/notifications apps/notifications
COPY libs libs

RUN cd apps/notifications && npm i

RUN npm run build notifications

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

RUN npm i --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main.js"]