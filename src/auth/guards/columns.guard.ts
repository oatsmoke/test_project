import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ColumnsService } from '../../columns/columns.service';

@Injectable()
export class ColumnsGuard implements CanActivate {
  constructor(private columnsService: ColumnsService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const column = await this.columnsService.findOne(request.params.columnId, request.params.userId);
    if (!column || request.user.sub != request.params.userId) {
      throw new ForbiddenException();
    }
    return true;
  }
}
