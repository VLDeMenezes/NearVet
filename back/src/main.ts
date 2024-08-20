import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  
  //genero el Document Builder donde preconfiguro los datos basicos 
  const swaggerConfig = new DocumentBuilder()
        .setTitle("NearVet - Veterinarias siempre cerca de tu mascota")
        .setDescription("Esta es una API REST para NearVet. Buscamos traer un beneficio tanto a las Veterinarias como a las mascotas de todos ofreciendo un servicio de interconexión")
        .addBearerAuth()
        .setVersion("1.0")
        .build()
      
  //creo el documento. le asigno la ruta "api" 
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("doc", app, document)

  //del class-validator
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(3000);
}
bootstrap();
