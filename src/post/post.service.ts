import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
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

  async getPostById(id: number): Promise<PostEntity> {
    return await this.postRepository.getPostById(id);
  }

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.getPostList(null);
  }

  async getPostBySearchQuery(search: string): Promise<PostEntity[]> {
    return await this.postRepository.getPostList(search);
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.getTagList();
  }

  async parseTags(tags: string): Promise<Tag[]> {
    const tagList: Tag[] = [];
    const tagStringList: string[] = tags.split(',');
    for (const tagString of tagStringList) {
      console.log(tagString);
      const tag = await this.tagRepository.createTag(tagString);
      tagList.push(tag);
    }
    return tagList;
  }

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const tagList = await this.parseTags(createPostDto.tags);

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

  async updatePost(
    updatePostDto: CreatePostDto,
    postId: number,
  ): Promise<PostEntity> {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const tagList = await this.parseTags(updatePostDto.tags);

    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    post.ver = updatePostDto.ver;
    post.thumbnail = updatePostDto.thumbnail;
    post.summary = updatePostDto.summary;
    post.tags = tagList;
    post.updated_at = new Date();

    await this.postRepository.save(post);
    return post;
  }

  async deletePost(postId: number): Promise<PostEntity> {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    post.is_deleted = true;
    post.updated_at = new Date();

    await this.postRepository.save(post);
    return post;
  }
}
