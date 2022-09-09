FROM node:18-alpine as buildClient
WORKDIR /app
COPY packages/client/package.json /app
RUN yarn --pure-lockfile
COPY packages/client /app
CMD [ "yarn", "build" ]

FROM node:18-alpine as buildServer
WORKDIR /app
COPY packages/server/package.json /app
RUN yarn --pure-lockfile
COPY packages/server /app
CMD [ "yarn", "build" ]

FROM node:18-alpine
WORKDIR /app
COPY --from=buildClient /app/build client/build
COPY --from=buildServer /app server
WORKDIR /app/server
EXPOSE 3333
ENTRYPOINT [ "yarn", "start:prod" ]
