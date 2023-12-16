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
  private readonly gpt = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
  });

  chat(body: ChatBody): Promise<Message> {
    return new Promise<any>((resolve, _) => {
      Promise.resolve().then(_ => {
        return this.gpt.chat.completions.create({
          model: body.model,
          messages: body.messages,
          temperature: body.temperature,
        });
      }).then(completion => {
        if (!Array.isArray(completion.choices) || completion.choices.length === 0) {
          return Promise.reject('choices is invalid');
        }
        const content = completion.choices[0].message.content;
        if (typeof content !== 'string' || content.length === 0) {
          return Promise.reject('message is invalid');
        }
        resolve({code: 0, message: 'OK', data: completion.choices[0].message});
      }).catch(error => {
        resolve({code: -1, message: error.message});
      })
    });
  }
}