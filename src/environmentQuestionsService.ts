import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import * as mitigationQuestions from './data/questions_mitigation.json';
import { shuffle } from 'lodash';

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  #getFiveQuestions(): any {
    const shuffledQuestions = shuffle(this.questions);
    return shuffledQuestions.slice(0, 5).map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));

      randomQuestion.answers.forEach((answer) => {
        delete answer.isCorrect;
      });

      return randomQuestion;
    });
  }

  getQuestions(): any {
    return this.#getFiveQuestions();
  }
}

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
  questions = mitigationQuestions;
}
