import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppService } from './app.service';
import { ClientAccessLog } from './client-access-log.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mysql',
      dbName: 'simple-monitoring-db',
      user: 'root',
      password: '1234',
      host: '127.0.0.1',
      port: 33008,
      migrations: {
        path: './src/migrations',
        emit: 'ts',
      },
      entities: [ClientAccessLog],
    }),
    MikroOrmModule.forFeature([ClientAccessLog]), // 이 줄 추가
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
