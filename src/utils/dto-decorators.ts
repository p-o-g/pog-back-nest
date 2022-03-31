import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

function ReqString(maxLength: number) {
  return applyDecorators(
    IsNotEmpty(),
    ApiProperty({ required: true }),
    IsString(),
    Length(1, maxLength),
  );
}

function ReqInt() {
  return applyDecorators(
    IsNotEmpty(),
    ApiProperty({ required: true }),
    IsInt(),
  );
}

function ReqBool() {
  return applyDecorators(
    IsNotEmpty(),
    ApiProperty({ required: true }),
    IsBoolean(),
  );
}

export { ReqString, ReqInt, ReqBool };
