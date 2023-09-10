import { Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as os from 'os';

@Injectable()
export class AppService {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

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

  getServerPort(): string {
    const addressInfo = this.httpAdapterHost.httpAdapter
      .getHttpServer()
      .address();
    const port =
      typeof addressInfo === 'string' ? addressInfo : addressInfo?.port;
    return port;
  }
}
