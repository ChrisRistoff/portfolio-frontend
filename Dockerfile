FROM node:20.10.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.10.0
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist ./build
EXPOSE 9090
CMD ["serve", "-s", "build", "-l", "9090"]

# Stage 2: Setup the Nginx server
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon;"]
