import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientAccessLog } from './client-access-log.entity';
import { AppService } from './app.service';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { getWithSleepDurationHistogram, getWithSleepCounter } from './metrics';

@Controller()
export class AppController extends PrometheusController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('prom')
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ip')
  async getIpAndPort(@Req() request: Request): Promise<string> {
    const serverIp = await this.appService.getExternalIp();
    const port = this.appService.getServerPort();

    await this.appService.saveLogRequestIP(serverIp);
    return `Server is running on IP: ${serverIp} and Port: ${port}`;
  }

  @Get('get-with-sleep')
  async getWithSleep(): Promise<string> {
    const start = Date.now();

    const result = await this.appService.getWithSeelp();

    const durationInSeconds = (Date.now() - start) / 1000;
    getWithSleepDurationHistogram.observe(durationInSeconds);

    // 호출 횟수 업데이트
    getWithSleepCounter.inc();
    return result;
  }

  @Get('logs')
  async getAllLogs(): Promise<ClientAccessLog[]> {
    return this.appService.findAllLogs();
  }
}
