import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './environmentQuestionsService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EnvironmentQuestionsService, MitigationQuestionsService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some environment questions', () => {
      expect(appController.getEnvironmentQuestions().length).toBeGreaterThan(0);
    });

    it('should return some mitigation questions', () => {
      expect(appController.getMitigationQuestions().length).toBeGreaterThan(0);
    });
  });

  describe('checkMitigationAnswers', () => {
    it('should return the correct score for the submitted answers', () => {
      const submittedAnswers = {
        'question-1': 'answer-1',
        'question-2': 'answer-2',
        'question-3': 'answer-3',
        'question-4': 'answer-4',
        'question-5': 'answer-5',
      };

      const score = appController.checkMitigationAnswers(submittedAnswers);

      expect(score).toBe(5);
    });
  });

  describe('checkEnvironmentAnswers', () => {
    it('should return the correct score for the submitted answers', () => {
      const submittedAnswers = {
        'question-1': 'answer-1',
        'question-2': 'answer-2',
        'question-3': 'answer-3',
        'question-4': 'answer-4',
        'question-5': 'answer-5',
      };

      const score = appController.checkEnvironmentAnswers(submittedAnswers);

      expect(score).toBe(5);
    });
  });

  describe('getMitigationQuestions', () => {
    it('should return five questions', () => {
      const questions = appController.getMitigationQuestions();

      expect(questions.length).toBe(5);
    });
  });

  describe('getEnvironmentQuestions', () => {
    it('should return five questions', () => {
      const questions = appController.getEnvironmentQuestions();

      expect(questions.length).toBe(5);
    });
  });
});
