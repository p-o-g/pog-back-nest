import { ReqInt, ReqString } from 'src/utils/dto-decorators';

export class CreatePostDto {
  @ReqInt()
  userId: number;

  @ReqString(100)
  title: string;

  @ReqString(2000)
  description: string;

  @ReqInt()
  ver: number;

  @ReqString(100)
  thumbnail: string;

  @ReqString(100)
  summary?: string;

  @ReqString(300)
  tags: string;
}
