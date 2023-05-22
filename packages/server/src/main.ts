import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VERSION_NEUTRAL, VersioningType,ValidationPipe, HttpStatus } from '@nestjs/common';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from '@/common/exceptions/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
    },
  );

  /**
   * 解析处理
   */
  app.useBodyParser('text/xml');
  app.useBodyParser('application/xml');
  /**
   * 版本控制
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });

  /**
   * 提交表单校验器
   */
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.FORBIDDEN
  }));
  /**
   * 全局响应拦截
   */
  app.useGlobalInterceptors(new ResponseInterceptor());
  /**
   * 全局异常拦截
   */
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
