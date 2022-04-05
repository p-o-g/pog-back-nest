import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'Optional Search Query',
    required: false,
  })
  async getPostList(@Query('search') searchQuery?: string): Promise<any> {
    if (searchQuery) {
      return this.postService.getPostBySearchQuery(searchQuery);
    } else {
      return this.postService.getAllPosts();
    }
  }

  @Post('/post')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(@Body() createPostDto: CreatePostDto): Promise<any> {
    return this.postService.createPost(createPostDto);
  }

  @Put('/post/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<any> {
    return this.postService.updatePost(createPostDto, id);
  }

  @Delete('/post/:id')
  async deletePost(@Param('id') id: number): Promise<any> {
    return this.postService.deletePost(id);
  }

  @Get('/tags')
  async getTags(): Promise<any> {
    console.log('Tags');
    return this.postService.getAllTags();
  }
}
