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

import { Type } from 'class-transformer';
import {
  IsNotEmpty, IsString, IsEnum,
  IsArray, ArrayMinSize, ValidateNested,
  IsNumber, Max, Min, IsOptional,
} from 'class-validator';

export enum ChatRole {
  system    = 'system',
  user      = 'user',
  assistant = 'assistant',
}

export enum ChatModel {
  gpt35 = 'gpt-3.5-turbo',
  gpt4  = 'gpt-4',
}

export class Message {
  @IsEnum(ChatRole)
  readonly role: ChatRole;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}

export class ChatBody {
  @IsEnum(ChatModel)
  readonly model: ChatModel;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Message)
  readonly messages: Message[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  readonly temperature?: number;
}

export enum TTSModel {
  tts1    = 'tts-1',
  tts1hd  = 'tts-1-hd',
}

export enum TTSVoice {
  alloy   = 'alloy',
  echo    = 'echo',
  fable   = 'fable',
  onyx    = 'onyx',
  nova    = 'nova',
  shimmer = 'shimmer',
}

export enum TTSFormat {
  mp3  = 'mp3',
  opus = 'opus',
  aac  = 'aac',
  flac = 'flac',
}

export class TTSBody {
  @IsEnum(TTSModel)
  readonly model: TTSModel;

  @IsString()
  @IsNotEmpty()
  readonly input: string;

  @IsEnum(TTSVoice)
  readonly voice: TTSVoice;

  @IsOptional()
  @IsEnum(TTSFormat)
  readonly format?: TTSFormat;
  
  @IsOptional()
  @IsNumber()
  @Min(0.25)
  @Max(4)
  readonly speed?: number;
}

export class ASRBody {
  
}
