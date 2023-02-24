import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    MinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'aSSG5tN07296VzGW',
      secretKey: 'h9wTa5kMdQCEvqs5QT3PJwu5aqRKb3qw',
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
