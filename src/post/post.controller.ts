import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@ApiTags('POST CRUD API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/:id')
  async getPostById(@Param('id') id: number): Promise<any> {
    return this.postService.getPostById(id);
  }

  @Get()
  async getPostList(): Promise<any> {
    return this.postService.getAllPosts();
  }

  @Post('/')
  async createPost(@Body() postDto: CreatePostDto): Promise<any> {
    return this.postService.createPost(postDto);
  }
}
