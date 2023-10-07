import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    bufferLogs: true,
  });

  // Setup pino logger as default
  app.useLogger(app.get(Logger));

  // Protect Swagger
  app.use(
    '/docs*',
    basicAuth({
      challenge: true,
      users: {
        super: 'super123',
      },
    }),
  );

  // Setup logging
  app.use(morgan('dev'));

  // Setup cors
  app.use(cors());

  // Setup security headers
  app.use(helmet());

  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'version',
  //   defaultVersion: '1',
  // });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Banking system')
      .setDescription('Banking system API description')
      .setVersion('1.0')
      .addBearerAuth()
      .setDescription(
        `### Docs
  
  Here you can find all the required information to use the HodHod backend for development.
  
  <details><summary>Users credentials</summary>
  <p>
  
  **Super admin:**
    - \`username\`
      - super_admin
    - \`Password\`
      - password
  
  **manager:**
    - \`username\`
      - manager
    - \`Password\`
      - password
  
  **customer:**
    - \`username\`
      - customer
    - \`Password\`
      - password
  
  </p>
  </details>`,
      )
      .build();
    app.enableCors();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
