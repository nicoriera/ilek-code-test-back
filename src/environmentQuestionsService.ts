import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import * as mitigationQuestions from './data/questions_mitigation.json';
import { shuffle } from 'lodash';

type SubmittedAnswers = Record<string, string>;

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

  checkAnswers(submittedAnswers: SubmittedAnswers): number {
    let score = 0;

    this.questions.forEach((question) => {
      const questionId = `question-${question.id}`;
      const submittedAnswer = submittedAnswers[questionId];
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      console.log(`Question ID: ${question.id}`);
      console.log(`Submitted Answer: ${submittedAnswer}`);
      console.log(
        `Correct Answer: ${correctAnswer ? correctAnswer.answer : 'undefined'}`,
      );

      if (correctAnswer && submittedAnswer === correctAnswer.answer) {
        score++;
      }
      console.log(`Score: ${score}`);
    });

    return score;
  }

  getQuestions(): any {
    return this.#getFiveQuestions();
  }
}

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
  questions = mitigationQuestions;

  checkAnswers(submittedAnswers: SubmittedAnswers): number {
    let score = 0;

    this.questions.forEach((question) => {
      const submittedAnswer = submittedAnswers[`question-${question.id}`];
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      console.log(`Question ID: ${question.id}`);
      console.log(`Submitted Answer: ${submittedAnswer}`);
      console.log(
        `Correct Answer: ${correctAnswer ? correctAnswer.answer : 'N/A'}`,
      );

      if (correctAnswer && submittedAnswer === correctAnswer.answer) {
        score++;
      }
      console.log(`Score: ${score}`);
    });
    return score;
  }
}
