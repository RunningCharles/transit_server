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
//  Created by CharlesChen on 2023/12/02.
//  Copyright © 2023年 Tencent. All rights reserved.

import { Injectable } from '@nestjs/common';
import { IPCacheQuery, IPCacheBody } from 'src/ipcache/dtos/ipcache.dto';

@Injectable()
export class IPCacheService {
  private readonly mapper: {[key: string]: string} = {};

  get(query: IPCacheQuery): Promise<any> {
    if (!this.mapper[query.module]) {
      return Promise.resolve({ code: -1, message: `${query.module} is non-existent`});
    }
    return Promise.resolve({ code: 0, message: 'ok', data: { ip: this.mapper[query.module]}});
  }

  set(query: IPCacheQuery, body: IPCacheBody): Promise<any> {
    this.mapper[query.module] = body.ip;
    return Promise.resolve({ code: 0, message: 'ok' });
  }
}