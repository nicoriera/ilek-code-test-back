import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService,
  SubmittedAnswers,
  Question,
} from './environmentQuestionsService';

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): Question[] {
    return this.environmentQuestionsService.getQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): Question[] {
    return this.mitigationQuestionsService.getQuestions();
  }

  @Post('mitigation_answers')
  checkMitigationAnswers(@Body() submittedAnswers: SubmittedAnswers): {
    score: number;
  } {
    const score =
      this.mitigationQuestionsService.checkAnswers(submittedAnswers);
    return { score };
  }

  @Post('environment_answers')
  checkEnvironmentAnswers(@Body() submittedAnswers: SubmittedAnswers): {
    score: number;
  } {
    const score =
      this.environmentQuestionsService.checkAnswers(submittedAnswers);
    return { score };
  }
}
