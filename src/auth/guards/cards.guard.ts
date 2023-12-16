import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { CardsService } from '../../cards/cards.service';

@Injectable()
export class CardsGuard implements CanActivate {
  constructor(private cardsService: CardsService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const column = await this.cardsService.findOne(request.params.cardId, request.params.userId);
    if (!column || request.user.sub != request.params.userId) {
      throw new ForbiddenException();
    }
    return true;
  }
}
