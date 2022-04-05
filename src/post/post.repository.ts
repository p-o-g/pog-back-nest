import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getPostById(id: number): Promise<PostEntity> {
    const query = this.createQueryBuilder('postEntity').leftJoinAndSelect(
      'postEntity.tags',
      'tag',
    );
    return query
      .where('postEntity.id = :id', {
        id: id,
      })
      .andWhere('postEntity.is_deleted = false')
      .getOne();
  }

  async getPostList(search: string | null): Promise<PostEntity[]> {
    const query = this.createQueryBuilder('postEntity');

    if (search) {
      return query
        .where('postEntity.title like :search', {
          search: `%${search}%`,
        })
        .andWhere('postEntity.is_deleted = false')
        .leftJoinAndSelect('postEntity.tags', 'tags')
        .getMany();

      // console.log(query.getSql());
    }
    return query.leftJoinAndSelect('postEntity.tags', 'tags').getMany();
  }
}
