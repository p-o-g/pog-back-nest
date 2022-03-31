import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEnitity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ver: number;

  @Column()
  thumbnail: string;

  @Column()
  summary: string;

  @Column()
  tags: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  is_deleted: boolean;
}
