import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  BigInt.prototype['toJSON'] = function() { 
    return this.toString(); 
  };

  const swaggerConfig = new DocumentBuilder()
   .setTitle('bday-swagger')
   .setDescription('Study-Project')
   .setVersion('1.0')
   .build();

  const setDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, setDoc);

  await app.listen(3000);
}
bootstrap();
