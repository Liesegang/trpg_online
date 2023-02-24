import { Injectable } from '@nestjs/common';
import { BucketItem } from 'minio';
import { MinioService } from 'nestjs-minio-client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(private readonly minioService: MinioService) {}

  readonly bucketName = 'trpg';
  readonly imagesPrefix = 'images';

  private getUserImagesDirectoryPath(identifier: string) {
    return `user/${identifier}/${this.imagesPrefix}/`;
  }

  async getObjectList(identifier: string): Promise<BucketItem[]> {
    const dirPath = this.getUserImagesDirectoryPath(identifier);
    const stream = await this.minioService.client.listObjectsV2(
      this.bucketName,
      dirPath,
      true,
    );

    const result: BucketItem[] = [];
    await new Promise<void>((resolve) => {
      stream.on('data', (item: BucketItem) => {
        result.push(item);
      });
      stream.on('end', () => {
        resolve();
      });
    });

    result.sort();
    return result;
  }

  async create(identifier: string, file: Express.Multer.File): Promise<string> {
    const uuid = uuidv4();
    const filePath = `${this.getUserImagesDirectoryPath(identifier)}${uuid}`;

    await this.minioService.client.putObject(
      this.bucketName,
      filePath,
      file.buffer,
    );
    return filePath;
  }

  async list(identifier: string): Promise<BucketItem[]> {
    const objects = await this.getObjectList(identifier);
    return objects;
  }

  async getTotalSize(identifier: string): Promise<number> {
    const objects = await this.getObjectList(identifier);
    return objects.reduce((value, item) => {
      return item.size + value;
    }, 0);
  }

  async delete(identifier: string, uuid: string): Promise<boolean> {
    const filePath = `${this.getUserImagesDirectoryPath(identifier)}${uuid}`;
    try {
      await this.minioService.client.removeObject(this.bucketName, filePath);
    } catch (e) {
      return false;
    }
    return true;
  }
}
