import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEnitity } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async getPostById(id: number): Promise<PostEnitity> {
    return await this.postRepository.getPostById(id);
  }

  async getAllPosts(): Promise<PostEnitity[]> {
    return await this.postRepository.getPostList(null);
  }

  async createPost(postDto: CreatePostDto): Promise<PostEnitity> {
    return await this.postRepository.createPost(postDto);
  }
}
