import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  EnvironmentQuestionsService,
  MitigationQuestionsService,
} from './environmentQuestionsService';

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

type SubmittedAnswers = {
  [key: string]: string;
};

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
    console.log(submittedAnswers);
    const score =
      this.mitigationQuestionsService.checkAnswers(submittedAnswers);
    return { score };
  }

  @Post('environment_answers')
  checkEnvironmentAnswers(@Body() submittedAnswers: SubmittedAnswers): {
    score: number;
  } {
    console.log(submittedAnswers);
    const score =
      this.environmentQuestionsService.checkAnswers(submittedAnswers);
    return { score };
  }
}
