import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(3000); // Puerto HTTP
  console.log('HTTP server is running on port 3000');
}
/* 
==> Port scan timeout reached, no open HTTP ports detected. 
If you don't need to receive public HTTP traffic, create a private service instead.
 */
bootstrap();
