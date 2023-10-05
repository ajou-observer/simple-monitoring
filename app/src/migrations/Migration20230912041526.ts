import { Migration } from '@mikro-orm/migrations';

export class Migration20230912041526 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `client_access_log` (`id` int unsigned not null auto_increment primary key, `queried_ip` varchar(255) not null, `timestamp` datetime not null) default character set utf8mb4 engine = InnoDB;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `client_access_log`;');
  }
}
