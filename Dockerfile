FROM node:16.19-alpine as build
WORKDIR /

COPY . ./
RUN npm install
RUN npm build

FROM nginx:stable-alpine
COPY --from=build /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
