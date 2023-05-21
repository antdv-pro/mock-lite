import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import type { AppService } from './app.service'
import { JWTException } from '@/common/exceptions/jwt.exception'
import type { DBConfig } from '@/utils/config'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  getHello(): string {
    const dbConfig = this.configService.get<DBConfig>('db')
    return this.appService.getHello()
  }

  @Get('/test')
  @Version([VERSION_NEUTRAL, '1'])
  getTest(): string {
    throw new Error('test')
  }

  @Get('/test2')
  @Version([VERSION_NEUTRAL, '1'])
  getTest2() {
    JWTException.expire()
  }
}
