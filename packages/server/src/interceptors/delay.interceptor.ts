import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { sleep } from 'src/utils/sleep';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const delay = parseInt(process.env.DELAY, 10) || 0;
    if (delay > 0) await sleep(delay);

    return next.handle();
  }
}
