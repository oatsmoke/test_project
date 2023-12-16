import { Controller } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CommentDataDTO {
  @ApiProperty({ description: 'Comment body', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  body: string;
}

@Controller('comments')
export class CommentsController {
}
