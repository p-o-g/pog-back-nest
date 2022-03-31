import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
