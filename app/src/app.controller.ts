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
    const serverIp = await this.appService.getExternalIp();
    const port = this.appService.getServerPort();

    const log = new ClientAccessLog();

    await this.appService.saveLogRequestIP(serverIp);
    return `Server is running on IP: ${serverIp} and Port: ${port}`;
  }

  @Get('logs')
  async getAllLogs(): Promise<ClientAccessLog[]> {
    return this.appService.findAllLogs();
  }
}
