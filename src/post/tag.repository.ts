import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async getTagById(id: number): Promise<Tag> {
    const found = await this.findOne(id);
    if (!found) {
      throw new Error('Tag not found');
    }
    return found;
  }

  async getTagList(): Promise<Tag[]> {
    const query = this.find({
      where: {
        is_deleted: false,
      },
    });
    return query;
  }

  async createTag(name: string): Promise<Tag> {
    const tag = this.create({
      name: name,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    });
    await this.save(tag);
    return tag;
  }
}
