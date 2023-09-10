import { Controller, Get } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppService } from './app.service';
import * as os from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ip')
  getIpAndPort(): string {
    const ip = this.appService.getServerIp();
    const port = this.appService.getServerPort();
    return `Server is running on IP: ${ip} and Port: ${port}`;
  }
}
