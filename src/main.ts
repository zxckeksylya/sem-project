import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('sem-project')
  .setDescription('documentation')
  .setVersion('1.0.0')
  .addTag('nestjs')
  .build()

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('/api/docs',app,document)

  await app.listen(PORT,()=>console.log(`server started on port ${PORT}`));
}
bootstrap();
