import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEnitity } from './post.entity';
import { Tag } from './tag.entity';

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
    const query = this.createQueryBuilder('postEnitity').leftJoinAndSelect(
      'postEnitity.tags',
      'tags',
    );
    if (search) {
      query.andWhere('postEntity.title like :search', {
        search: `%${search}%`,
      });
    }
    return query.getMany();
  }
}
