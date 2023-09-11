import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClientAccessLog } from './client-access-log.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ip')
  async getIpAndPort(@Req() request: Request): Promise<string> {
    const serverIp = this.appService.getServerIp();
    const port = this.appService.getServerPort();
    const ip =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    const log = new ClientAccessLog();
    log.queriedIP = ip.toString();

    await this.appService.saveLogRequestIP(ip.toString());
    return `Server is running on IP: ${serverIp} and Port: ${port}`;
  }

  @Get('logs')
  async getAllLogs(): Promise<ClientAccessLog[]> {
    return this.appService.findAllLogs();
  }
}
