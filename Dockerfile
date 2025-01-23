FROM node:18

LABEL maintainer="Camden Call"
LABEL description="Get spotify song reccomedations"
LABEL cohort=""
LABEL animal="Bird"
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]