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
        'question-1': '1',
        'question-2': '1',
        'question-3': '1',
        'question-4': '1',
        'question-5': '1',
      };

      const result = appController.checkMitigationAnswers(submittedAnswers);

      expect(result.score).toBe(5);
    });
  });

  describe('checkEnvironmentAnswers', () => {
    it('should return the correct score for the submitted answers', () => {
      const submittedAnswers = {
        'question-1': '1',
        'question-2': '1',
        'question-3': '3',
        'question-4': '1',
        'question-5': '3',
      };

      const result = appController.checkEnvironmentAnswers(submittedAnswers);

      expect(result.score).toBe(5);
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
