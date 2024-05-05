import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostImageDto } from './dto/create-image.dto';
import { basename, join } from 'path';
import {
  TEMP_FOLDER_PATH,
  public_FOLDER_PATH,
} from 'src/common/const/path.const';
import { promises } from 'fs';
import { QueryRunner, Repository } from 'typeorm';
import { Images } from 'src/common/entity/image.entity';

@Injectable()
export class PostsImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}

  getRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository(Images) : this.imagesRepository;
  }

  async createPostImage(dto: CreatePostImageDto, qr?: QueryRunner) {
    const repository = this.getRepository(qr);

    const tempFilePath = join(public_FOLDER_PATH, dto.path);
    try {
      // 파일 존재 여부 확인 없다면 에러
      await promises.access(tempFilePath);
    } catch (error) {
      throw new BadRequestException('File not found');
    }

    const fileName = basename(tempFilePath);

    const newPath = join(TEMP_FOLDER_PATH, fileName);

    const result = await repository.save({
      ...dto,
    });

    await promises.rename(tempFilePath, newPath);

    return result;
  }
}
