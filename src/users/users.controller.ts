import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ColumnsGuard } from '../auth/guards/columns.guard';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ColumnDataDTO } from '../columns/columns.controller';
import { ColumnsService } from '../columns/columns.service';
import { CardsService } from '../cards/cards.service';
import { CardDataDTO } from '../cards/cards.controller';
import { CardsGuard } from '../auth/guards/cards.guard';
import { CommentsService } from '../comments/comments.service';
import { CommentDataDTO } from '../comments/comments.controller';
import { CommentsGuard } from '../auth/guards/comments.guard';


export class UserDataDTO {
  @ApiProperty({ description: 'User email', maxLength: 20 })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  email: string;
  @ApiProperty({ description: 'User password', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  password: string;
}

@ApiTags('Users')
@ApiSecurity('Authorization', ['Authorization'])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly columnsService: ColumnsService,
              private readonly cardsService: CardsService,
              private readonly commentsService: CommentsService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDataDTO, description: 'Request body' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  createUser(@Body() userData: UserDataDTO) {
    return this.usersService.create(userData.email, userData.password);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiResponse({ status: 200, description: 'User received' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard)
  findOneUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOneById(userId);
  }

  @Get(':userId/columns')
  @ApiOperation({ summary: 'Get columns' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiResponse({ status: 200, description: 'Columns received' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard)
  findAllColumns(@Param('userId', ParseIntPipe) userId: number) {
    return this.columnsService.findAll(userId);
  }

  @Put(':userId/columns/:columnId')
  @ApiOperation({ summary: 'Change column' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'columnId', description: 'Column id' })
  @ApiBody({ type: ColumnDataDTO, description: 'Request body' })
  @ApiResponse({ status: 200, description: 'Column changed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, ColumnsGuard)
  updateColumns(@Param('columnId', ParseIntPipe) columnId: number,
                @Body() columnData: ColumnDataDTO) {
    return this.columnsService.update(columnId, columnData.title);
  }

  @Delete(':userId/columns/:columnId')
  @ApiOperation({ summary: 'Remove column' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'columnId', description: 'Column id' })
  @ApiResponse({ status: 200, description: 'Column removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, ColumnsGuard)
  deleteColumns(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnsService.delete(columnId);
  }

  @Get(':userId/columns/:columnId/cards')
  @ApiOperation({ summary: 'Get cards' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'columnId', description: 'Column id' })
  @ApiResponse({ status: 200, description: 'Cards received' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard)
  findAllCards(@Param('userId', ParseIntPipe) userId: number,
               @Param('columnId', ParseIntPipe) columnId: number) {
    return this.cardsService.findAll(columnId, userId);
  }

  @Put(':userId/cards/:cardId')
  @ApiOperation({ summary: 'Change card' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'cardId', description: 'Card id' })
  @ApiBody({ type: CardDataDTO, description: 'Request body' })
  @ApiResponse({ status: 200, description: 'Card changed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, CardsGuard)
  updateCards(@Param('cardId', ParseIntPipe) cardId: number,
              @Body() cardData: CardDataDTO) {
    return this.cardsService.update(cardId, cardData.title, cardData.body);
  }

  @Delete(':userId/cards/:cardId')
  @ApiOperation({ summary: 'Remove card' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'cardId', description: 'Card id' })
  @ApiResponse({ status: 200, description: 'Card removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, CardsGuard)
  deleteCards(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.cardsService.delete(cardId);
  }

  @Get(':userId/cards/:cardId/comments')
  @ApiOperation({ summary: 'Get comments' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'cardId', description: 'Card id' })
  @ApiResponse({ status: 200, description: 'Comments received' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard)
  findAllComments(@Param('userId', ParseIntPipe) userId: number,
                  @Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentsService.findAll(cardId, userId);
  }

  @Put(':userId/comments/:commentId')
  @ApiOperation({ summary: 'Change comment' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'commentId', description: 'Comment id' })
  @ApiBody({ type: CommentDataDTO, description: 'Request body' })
  @ApiResponse({ status: 200, description: 'Comment changed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, CommentsGuard)
  updateComments(@Param('commentId', ParseIntPipe) commentId: number,
                 @Body() commentData: CommentDataDTO) {
    return this.commentsService.update(commentId, commentData.body);
  }

  @Delete(':userId/comments/:commentId')
  @ApiOperation({ summary: 'Remove comment' })
  @ApiParam({ name: 'userId', description: 'User id' })
  @ApiParam({ name: 'commentId', description: 'Comment id' })
  @ApiResponse({ status: 200, description: 'Comment removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseGuards(AuthGuard, CommentsGuard)
  deleteComments(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.delete(commentId);
  }
}
