# 빌드 스테이지
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build 

# 런타임 스테이지
FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
# 런타임 의존성만 설치
RUN yarn install --production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["yarn", "start:prod"] 
