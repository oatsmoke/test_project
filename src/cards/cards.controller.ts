import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentsService } from '../comments/comments.service';
import { CommentDataDTO } from '../comments/comments.controller';

export class CardDataDTO {
  @ApiProperty({ description: 'Card title', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  title: string;
  @ApiProperty({ description: 'Card body', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  body: string;
}

@ApiTags('Cards')
@ApiSecurity('Authorization', ['Authorization'])
@Controller('cards')
export class CardsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Post(':cardId/comments')
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiParam({ name: 'cardId', description: 'Card id' })
  @ApiBody({ type: CommentDataDTO, description: 'Request body' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  createComment(@Param('cardId', ParseIntPipe) cardId: number,
                @Body() commentData: CommentDataDTO, @Req() req: any) {
    return this.commentsService.create(commentData.body, cardId, req.user.sub);
  }
}
