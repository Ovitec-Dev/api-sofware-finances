FROM node:lts-alpine AS builder
WORKDIR /build

COPY package.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY src/shared/docs ./src/shared/docs
COPY src/shared/handler/error.yml ./src/shared/handler/error.yml

RUN npm install 
RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app/

RUN apk add --no-cache tini \
    && mkdir -p /usr/src/app/logs \
    && ln -sf /dev/stdout /usr/src/app/logs/server.log

COPY --from=builder /build/dist dist
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/node_modules node_modules
COPY --from=builder /build/tsconfig.json tsconfig.json
COPY --from=builder /build/src/shared/docs dist/src/shared/docs
COPY --from=builder /build/src/shared/handler/error.yml dist/src/shared/handler/error.yml

USER node

WORKDIR /usr/src/app/dist

ENTRYPOINT ["tini", "--","npm", "run", "server:prod:docker"]
