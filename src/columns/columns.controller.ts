import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardDataDTO } from '../cards/cards.controller';
import { CardsService } from '../cards/cards.service';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserDataDTO } from '../users/users.controller';

export class ColumnDataDTO {
  @ApiProperty({ description: 'Column title', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  title: string;
}

@ApiTags('Columns')
@ApiSecurity('Authorization', ['Authorization'])
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService,
              private readonly cardsService: CardsService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new column' })
  @ApiBody({ type: ColumnDataDTO, description: 'Request body' })
  @ApiResponse({ status: 201, description: 'Column created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  createColumn(@Body() columnData: ColumnDataDTO, @Req() req: any) {
    return this.columnsService.create(columnData.title, req.user.sub);
  }

  @Post(':columnId/cards')
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({ type: CardDataDTO, description: 'Request body' })
  @ApiResponse({ status: 201, description: 'Card created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  createCard(@Param('columnId', ParseIntPipe) columnId: number,
             @Body() cardData: CardDataDTO, @Req() req: any) {
    return this.cardsService.create(cardData.title, cardData.body, columnId, req.user.sub);
  }
}
