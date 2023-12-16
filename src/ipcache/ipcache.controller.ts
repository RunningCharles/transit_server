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
//  Created by CharlesChen on 2023/02/10.

import { Controller, Post, Get, HttpCode, Query, Body } from '@nestjs/common';
import { IPCacheQuery, IPCacheBody } from 'src/ipcache/dtos/ipcache.dto';
import { IPCacheService } from 'src/ipcache/ipcache.service';
import { Logger } from 'src/common/logger/logger.service';

@Controller('ipcache')
export class IPCacheController {
  private readonly logger = new Logger(IPCacheController.name);

  constructor(private readonly service: IPCacheService) {}

  @Get()
  @HttpCode(200)
  get(@Query() query: IPCacheQuery): Promise<any> {
    this.logger.info('received get request');
    this.logger.info('query:', query);
    return this.service.get(query);
  }

  @Post()
  @HttpCode(200)
  post(@Query() query: IPCacheQuery, @Body() body: IPCacheBody): Promise<any>  {
    this.logger.info('received post request');
    this.logger.info('query:', query);
    this.logger.info('body:', body);
    return this.service.set(query, body);
  }
}
