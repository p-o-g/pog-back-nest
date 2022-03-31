import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEnitity } from './post.entity';

@EntityRepository(PostEnitity)
export class PostRepository extends Repository<PostEnitity> {
  async getPostById(id: number): Promise<PostEnitity> {
    const found = await this.findOne(id);
    if (!found) {
      throw new Error('Post not found');
    }
    return found;
  }

  async getPostList(search: string | null): Promise<PostEnitity[]> {
    const query = this.createQueryBuilder('postEnitity');
    if (search) {
      query.andWhere('postEntity.title like :search', {
        search: `%${search}%`,
      });
    }
    return query.getMany();
  }

  async createPost(postDto: CreatePostDto): Promise<PostEnitity> {
    const post = this.create({
      user_id: postDto.userId,
      title: postDto.title,
      description: postDto.description,
      ver: postDto.ver,
      thumbnail: postDto.thumbnail,
      summary: postDto.summary,
      tags: postDto.tags,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });

    await this.save(post);
    return post;
  }
}
