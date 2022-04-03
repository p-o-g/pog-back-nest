import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { TagRepository } from './tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, TagRepository])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
