import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { IPCacheModule } from 'src/ipcache/ipcache.module';
import { GPTModule } from 'src/gpt/gpt.module';
import { TestModule } from 'src/1test/test.module';
import { ENV, Utils } from 'src/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`.env.${Utils.env()}`, `.env.${ENV.dev}`]
  }),
  IPCacheModule,
  GPTModule,
  TestModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
