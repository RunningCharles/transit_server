//
//
//      ┏┛ ┻━━━━━┛ ┻┓
//      ┃　　　　　　 ┃
//      ┃　　　━　　　┃
//      ┃　┳┛　  ┗┳　┃
//      ┃　　　　　　 ┃
//      ┃　　　┻　　　┃
//      ┃　　　　　　 ┃
//      ┗━┓　　　┏━━━┛
//        ┃　　　┃   神兽保佑
//        ┃　　　┃   代码无BUG！
//        ┃　　　┗━━━━━━━━━┓
//        ┃　　　　　　　    ┣┓
//        ┃　　　　         ┏┛
//        ┗━┓ ┓ ┏━━━┳ ┓ ┏━┛
//          ┃ ┫ ┫   ┃ ┫ ┫
//          ┗━┻━┛   ┗━┻━┛
//
//  Created by CharlesChen on 2023/12/16.

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Logger } from 'src/common/logger/logger.service';
import { GPTService } from 'src/gpt/gpt.service';
import { ChatBody } from 'src/gpt/dtos/gpt.chat.dto';

@Controller('gpt')
export class GPTController {
  private readonly logger = new Logger(GPTController.name);

  constructor(private readonly service: GPTService) {}

  @Post('chat')
  @HttpCode(200)
  chat(@Body() body: ChatBody): Promise<any>  {
    this.logger.info('received post request');
    this.logger.info('body:', body);
    return this.service.chat(body);
  }
}