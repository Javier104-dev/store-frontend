FROM public.ecr.aws/docker/library/node:22.12.0-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache curl

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start:prod"]
