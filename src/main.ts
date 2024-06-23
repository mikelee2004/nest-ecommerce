import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // swagger ui
  const config = new DocumentBuilder()
  .setTitle('E-commerce Application')
  .setDescription(
    '[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)'
  )
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = parseInt(process.env.PORT);
  const SERVER = process.env.SERVER;
  await app.listen(PORT, SERVER);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
