FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:1.19-alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
