import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Get,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { BucketItem } from 'minio';
import { Delete, Param } from '@nestjs/common/decorators';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles({ roles: ['user'] })
  async uploadFile(
    @AuthenticatedUser() user: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    return await this.imagesService.create(user.sub, file);
  }

  @Get('list')
  @Roles({ roles: ['user'] })
  async listFiles(@AuthenticatedUser() user: any): Promise<BucketItem[]> {
    return await this.imagesService.list(user.sub);
  }

  @Get('total_size')
  @Roles({ roles: ['user'] })
  async totalSizeOfUserFiles(@AuthenticatedUser() user: any): Promise<number> {
    return await this.imagesService.getTotalSize(user.sub);
  }

  @Delete(':uuid')
  @Roles({ roles: ['user'] })
  async deleteFile(
    @AuthenticatedUser() user: any,
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<boolean> {
    return await this.imagesService.delete(user.sub, uuid);
  }
}
