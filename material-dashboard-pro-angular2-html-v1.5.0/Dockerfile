FROM docker.io/nginx 
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html
## this is new file to avoid getting 404 page on refresh. 
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]