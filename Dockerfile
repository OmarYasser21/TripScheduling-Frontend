FROM node:latest as build-stage
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY . .
RUN npm -i -g @angular/cli
RUN npm install
RUN ng build --prod

FROM nginxinc/nginx-unprivileged
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
