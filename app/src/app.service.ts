import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { HttpAdapterHost } from '@nestjs/core';
import * as os from 'os';
import { ClientAccessLog } from './client-access-log.entity';
import * as http from 'http';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ClientAccessLog)
    private readonly clientAccessLogRepository: EntityRepository<ClientAccessLog>,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly em: EntityManager,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getServerIp(): string {
    const interfaces = os.networkInterfaces();
    var ip: string;

    for (let k in interfaces) {
      for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          ip = address.address;
        }
      }
    }
    return ip;
  }

getExternalIp(): Promise<string> {
    return new Promise((resolve, reject) => {
        http.get({ host: 'httpbin.org', path: '/ip' }, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const ip = JSON.parse(data).origin;
                    resolve(ip);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}
  getServerPort(): string {
    const addressInfo = this.httpAdapterHost.httpAdapter
      .getHttpServer()
      .address();
    const port =
      typeof addressInfo === 'string' ? addressInfo : addressInfo?.port;
    return port;
  }

  async findAllLogs(): Promise<ClientAccessLog[]> {
    return this.clientAccessLogRepository.findAll();
  }

  async saveLogRequestIP(ip: string): Promise<void> {
    const log = new ClientAccessLog();
    log.queriedIP = ip;
    log.timestamp = new Date();
    await this.em.persistAndFlush(log);
  }
}
