import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService,
} from './environmentQuestionsService';

type SubmittedAnswers = Record<string, string>;

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    return this.environmentQuestionsService.getQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    return this.mitigationQuestionsService.getQuestions();
  }

  @Post('mitigation_answers')
  checkMitigationAnswers(@Body() submittedAnswers: SubmittedAnswers): any {
    const score =
      this.mitigationQuestionsService.checkAnswers(submittedAnswers);
    return { score };
  }
}
