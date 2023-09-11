import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // '0.0.0.0' 이라는 IPv4 주소를 명시함으로써 IPv4 기반으로 서버가 실행됨
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
