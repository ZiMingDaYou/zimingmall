FROM node:10.13-alpine
ENV NODE_ENV production
RUN mkdir /usr/src
COPY . /usr/src
WORKDIR /usr/src/app
RUN npm install 
RUN npm build
EXPOSE 8088
ENTRYPOINT ["npm","run"]
CMD ["start"]