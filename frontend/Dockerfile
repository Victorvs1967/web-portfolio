FROM node:slim AS build

# install dependencies first, in a different location for easier app bind mounting for local development

RUN mkdir /home/app
WORKDIR /home/app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm install --omit=optional --legacy-peer-deps && npm cache clean --force
ENV PATH="/home/app/node_modules/.bin:$PATH"

COPY . .
RUN ng build 

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/app/dist/angular-admin-dashboard /usr/share/nginx/html