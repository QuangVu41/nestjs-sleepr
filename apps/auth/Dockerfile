FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm ci 

COPY apps/auth apps/auth
COPY libs libs

RUN npm run build auth

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

RUN npm i --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main.js"]