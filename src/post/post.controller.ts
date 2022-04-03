import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('POST CRUD API')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/post/:id')
  async getPostById(@Param('id') id: number): Promise<any> {
    return this.postService.getPostById(id);
  }

  @Get('/post')
  async getPostList(): Promise<any> {
    return this.postService.getAllPosts();
  }

  @Get('/tags')
  async getTags(): Promise<any> {
    console.log('Tags');
    return this.postService.getAllTags();
  }

  @Post('/post')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Body() createPostDto: CreatePostDto): Promise<any> {
    return this.postService.createPost(createPostDto);
  }
}
