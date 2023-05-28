import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EnvironmentQuestionsService],
})
export class AppModule {}
