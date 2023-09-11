import { MikroORM } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ClientAccessLog } from './src/client-access-log.entity';

export default {
  entities: [ClientAccessLog],
  host: '127.0.0.1',
  port: 33008,
  dbName: 'simple-monitoring-db',
  type: 'mysql',
  user: 'root',
  password: '1234',
  debug: true,
  highlighter: new SqlHighlighter(),
  migrations: {
    path: './src/migrations',
    pattern: /^[\w-]+\d+\.[tj]s$/,
    emit: 'ts', // 'ts' 또는 'js' - TypeScript 또는 JavaScript로 마이그레이션 파일을 작성
  },
} as Parameters<typeof MikroORM.init>[0];
