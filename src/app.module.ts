import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService,
} from './environmentQuestionsService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EnvironmentQuestionsService, MitigationQuestionsService],
})
export class AppModule {}
