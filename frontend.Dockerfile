FROM nikolaik/python-nodejs:python3.10-nodejs16 AS builder
WORKDIR /app
COPY ./frontend/ .
RUN yarn install && yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY ./nginx/ .
RUN rm /etc/nginx/conf.d/default.conf
RUN cp nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]