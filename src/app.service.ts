import { Injectable } from '@nestjs/common';
import { MyLoggerService } from './logger/logger.services';

@Injectable()
export class AppService {
  constructor(private readonly logger: MyLoggerService) {}
  getHello(): string {
    this.logger.log('Hello World message logged');
    return 'Create an Account on UIXLabs!!!';
  }
}
