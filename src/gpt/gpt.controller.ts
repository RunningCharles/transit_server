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

import { Controller, HttpCode, Post, Headers, Body } from '@nestjs/common';
import { Logger } from 'src/common/logger/logger.service';
import { GPTService } from 'src/gpt/gpt.service';
import { ASRBody, ChatBody, GHeaders, TTSBody } from 'src/gpt/dtos/gpt.chat.dto';

@Controller('gpt')
export class GPTController {
  private readonly logger = new Logger(GPTController.name);

  constructor(private readonly service: GPTService) {}

  @Post('chat')
  @HttpCode(200)
  chat(@Headers() headers: GHeaders, @Body() body: ChatBody): Promise<any>  {
    this.logger.info('received post request');
    this.logger.info('body:', body);
    return this.service.chat(headers, body);
  }

  @Post('tts')
  @HttpCode(200)
  tts(@Headers() headers: GHeaders, @Body() body: TTSBody): Promise<any>  {
    this.logger.info('received post request');
    this.logger.info('body:', body);
    return this.service.tts(headers, body);
  }

  @Post('asr')
  @HttpCode(200)
  asr(@Headers() headers: GHeaders, @Body() body: ASRBody): Promise<any>  {
    this.logger.info('received post request');
    this.logger.info('body:', body);
    return this.service.asr(headers, body);
  }
}