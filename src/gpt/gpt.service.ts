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

import { OpenAI } from 'openai';
import { Injectable } from '@nestjs/common';
import { ChatBody, Message } from 'src/gpt/dtos/gpt.chat.dto';

@Injectable()
export class GPTService {
  chat(headers: {[key: string]: string}, body: ChatBody): Promise<Message> {
    return new Promise<any>((resolve, _) => {
      Promise.resolve().then(_ => {
        if (typeof headers.authorization !== 'string') {
          return Promise.reject(new Error('Authorization is invalid'));
        }
        const apikey = headers.authorization.replace('Bearer ', '');
        const client = new OpenAI({apiKey: apikey});
        return client.chat.completions.create({
          model: body.model,
          messages: body.messages,
          temperature: body.temperature,
        });
      }).then(completion => {
        if (!Array.isArray(completion.choices) || completion.choices.length === 0) {
          return Promise.reject(new Error('choices is invalid'));
        }
        const content = completion.choices[0].message.content;
        if (typeof content !== 'string' || content.length === 0) {
          return Promise.reject(new Error('message is invalid'));
        }
        resolve({code: 0, message: 'OK', data: completion.choices[0].message});
      }).catch(error => {
        resolve({code: -1, message: error.message});
      })
    });
  }
}