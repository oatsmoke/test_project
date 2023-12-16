import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { CommentsService } from '../../comments/comments.service';

@Injectable()
export class CommentsGuard implements CanActivate {
  constructor(private commentsService: CommentsService) {
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const column = await this.commentsService.findOne(request.params.commentId, request.params.userId);
    if (!column || request.user.sub != request.params.userId) {
      throw new ForbiddenException();
    }
    return true;
  }
}
