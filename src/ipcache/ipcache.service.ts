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

import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { IPCacheQuery, IPCacheBody } from 'src/ipcache/dtos/ipcache.dto';

interface IPCache {
  module: string;
  ip: string;
  date: string;
}

@Injectable()
export class IPCacheService {
  private readonly mapper: {[key: string]: IPCache} = {};

  get(query: IPCacheQuery): Promise<any> {
    if (!this.mapper[query.module]) {
      return Promise.resolve({ code: -1, message: `${query.module} is non-existent`});
    }
    return Promise.resolve({ code: 0, message: 'ok', data: { ip: this.mapper[query.module]}});
  }

  set(query: IPCacheQuery, body: IPCacheBody): Promise<any> {
    const date = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
    this.mapper[query.module] = { module: query.module, ip: body.ip, date };
    return Promise.resolve({ code: 0, message: 'ok' });
  }
}
