import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  #getFiveQuestions(): any {
    return this.questions.slice(0, 4).map((question) => {
      question.answers.forEach((answer) => {
        delete answer.isCorrect;
      });

      return question;
    });
  }

  getQuestions(): any {
    return this.#getFiveQuestions();
  }
}
