# Simple Monitoing Service

### 1. 각 디렉토리에서 Docker 이미지를 빌드합니다:

```bash
# NestJS App
docker build --no-cache --platform linux/amd64 -t jayoh712/monitoring-app .

docker build  --platform linux/amd64  -t jayoh712/monitoring-db-migration -f Dockerfile.migration .

# Vanilla JS Web
docker build --no-cache --platform linux/amd64 -t vanilla-web .
```

### 2. Docker 컨테이너를 실행합니다:

```bash
# Mysql DataBase
docker run --name mysql-simple-monitoring -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=simple-monitoring-db -e MYSQL_ROOT_HOST=% -p 3306:3306 -d mysql

cd app

npx ts-node -r tsconfig-paths/register node_modules/.bin/mikro-orm migration:create
npx ts-node -r tsconfig-paths/register node_modules/.bin/mikro-orm migration:up

# NestJS App
docker run -d -p 3000:3000 nestjs-app

# Vanilla JS Web
docker run -d -p 8080:80 vanilla-web

```

### 3. make table.

> migration 자동화해야되는데 버그나서 일단 수동으로

```
CREATE TABLE `client_access_log` (   `id` INT NOT NULL AUTO_INCREMENT,
`queried_ip` VARCHAR(255) NOT NULL,   `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`) );
```

위 명령어를 실행하면, NestJS 앱은 `http://localhost:3000`에서, 바닐라 JS 웹 페이지는 `http://localhost:8080`에서 접근 가능합니다.

### 3. CORS 설정:

바닐라 JS 웹 페이지에서 NestJS 앱을 호출하려면, NestJS 앱에서 CORS 설정을 활성화하고 `origin`을 적절히 설정해야 합니다.

```typescript
app.enableCors({
  origin: "http://localhost:8080", // 바닐라 JS 웹 페이지 주소
});
```

이제 바닐라 JS 웹 페이지에서 NestJS 앱의 `/ip` 엔드포인트를 호출할 때 CORS 문제 없이 데이터를 가져올 수 있습니다.

참고로, 실제 프로덕션 환경에서는 보안, 네트워킹, 볼륨 마운팅 등 추가적인 설정이 필요할 수 있습니다. 위의 예제는 간단한 로컬 개발 환경에서의 사용을 위한 것입니다.

# K8S

### 1. amd64용 이미지 빌드

```bash
# NestJS App
cd app

docker build  --platform linux/amd64 -t nestjs-app .

# dp
docker build  --platform linux/amd64  -t jayoh712/monitoring-db-migration -f Dockerfile.migration .

# Vanilla JS Web
cd web

docker build  --platform linux/amd64 -t vanilla-web .
```

### 2. k8s파일 옮기기

scp 사용

```

```

### 3. db pod 생성

pv 생성후 db 띄우고 바운딩해주기

```
kubectl apply -f k8s/01.mysql-pv.yaml
kubectl apply -f k8s/02.mysql-deploy.yaml
```

### 4. db migration

원래 `kubectl apply -f k8s/03.migration-job.yaml`로 해야하는데 잘 안됨.

수동으로 하자.

mysql 접속

```
kubectl exec -it mysql-statefulset-0 -- /bin/bash

mysql -u [your-username] -p
```

database접속 후 테이블 생성

```
CREATE TABLE `client_access_log` (   `id` INT NOT NULL AUTO_INCREMENT,
`queried_ip` VARCHAR(255) NOT NULL,   `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,   PRIMARY KEY (`id`) );
```
