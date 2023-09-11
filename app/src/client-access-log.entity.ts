import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ClientAccessLog {
  @PrimaryKey()
  id: number;

  @Property()
  queriedIP: string;

  @Property({ type: 'Date', default: 'now' })
  timestamp: Date;
}
