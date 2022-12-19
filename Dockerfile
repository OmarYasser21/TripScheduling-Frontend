FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:latest
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
