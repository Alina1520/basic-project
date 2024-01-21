import * as dotenv from "dotenv"
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { excludeExtraneousValues: true },
		}),
	)

	const config  = new DocumentBuilder()
	.setTitle("Real API")
	.setDescription('The Real API description')
	.setVersion('1.0')
	.build()

	const document = SwaggerModule.createDocument(app,config)
	SwaggerModule.setup("docs",app,document)
  await app.listen(3001);
}
bootstrap();
