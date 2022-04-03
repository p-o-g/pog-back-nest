import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEnitity } from './post.entity';
import { PostRepository } from './post.repository';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,

    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  async getPostById(id: number): Promise<PostEnitity> {
    return await this.postRepository.getPostById(id);
  }

  async getAllPosts(): Promise<PostEnitity[]> {
    return await this.postRepository.getPostList(null);
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.getTagList();
  }

  async createPost(createPostDto: CreatePostDto): Promise<PostEnitity> {
    const tagList: Tag[] = [];
    if (createPostDto.tags) {
      const tagStringList: string[] = createPostDto.tags.split(',');
      for (const tagString of tagStringList) {
        console.log(tagString);
        const tag = await this.tagRepository.createTag(tagString);
        tagList.push(tag);
      }
    }

    const post = this.postRepository.create({
      user_id: createPostDto.userId,
      title: createPostDto.title,
      description: createPostDto.description,
      ver: createPostDto.ver,
      thumbnail: createPostDto.thumbnail,
      summary: createPostDto.summary,
      tags: tagList,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });

    await this.postRepository.save(post);
    return post;
  }
}
