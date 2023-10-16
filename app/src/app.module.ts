import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppService } from './app.service';
import { ClientAccessLog } from './client-access-log.entity';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mysql',
      dbName: 'simple-monitoring-db',
      user: 'root',
      password: '1234',
      host: 'db-service',
      port: 3306,
      migrations: {
        path: './src/migrations',
        emit: 'ts',
      },
      entities: [ClientAccessLog],
    }),
    PrometheusModule.register(),
    MikroOrmModule.forFeature([ClientAccessLog]), // 이 줄 추가
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
