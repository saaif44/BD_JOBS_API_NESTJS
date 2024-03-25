// app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { MessageModule } from './message/message.module';
import { multerConfig } from './config/multer.config';
import { FileController } from './file/file.controller';
 import { FileModule } from './file/file.module';
import { FileUploadService } from './file/file-upload.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ FileModule, AuthModule, PrismaModule, UsersModule, ProfileModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
    signOptions: { expiresIn: '1d' },
  }), MessageModule, MulterModule.register(multerConfig), ],
  controllers: [AppController, FileController ],
  providers: [AppService, FileUploadService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
