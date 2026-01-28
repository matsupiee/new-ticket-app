import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class EasyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // Admin用のheaderが送られてきている場合は早期にfalseを返す
    const apiKey = req.headers['backend-api-key'];

    return typeof apiKey === 'string' && apiKey === 'test';
  }
}
