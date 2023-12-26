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
import { Logger } from 'src/common/logger/logger.service';
import { ASRBody, ChatBody, TTSBody } from 'src/gpt/dtos/gpt.chat.dto';

@Injectable()
export class GPTService {
  private readonly logger = new Logger(GPTService.name);
  chat(headers: {[key: string]: string}, body: ChatBody): Promise<any> {
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

  tts(headers: {[key: string]: string}, body: TTSBody): Promise<any> {
    return new Promise<any>((resolve, _) => {
      Promise.resolve().then(_ => {
        if (typeof headers.authorization !== 'string') {
          return Promise.reject(new Error('Authorization is invalid'));
        }
        const apikey = headers.authorization.replace('Bearer ', '');
        const client = new OpenAI({apiKey: apikey});
        return client.audio.speech.create({
          model: body.model,
          input: body.input,
          voice: body.voice,
          response_format: body.format,
          speed: body.speed,
        });
      }).then(body => {
        return body.arrayBuffer();
      }).then(abuffer => {
        const buffer = Buffer.from(abuffer);
        resolve(buffer)
      }).catch(error => {
        resolve({code: -1, message: error.message});
      })
    });
  }

  asr(headers: {[key: string]: string}, body: ASRBody): Promise<any> {
    return new Promise<any>((resolve, _) => {
      Promise.resolve().then(_ => {
        resolve({code: 0, message: 'OK'});
      }).catch(error => {
        resolve({code: -1, message: error.message});
      })
    });
  }
}