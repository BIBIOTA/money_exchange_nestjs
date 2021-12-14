import { Get, Controller } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  root() {
    return { message: 'Hello world!!!!' };
  }
}
