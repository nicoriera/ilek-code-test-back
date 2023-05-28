import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EnvironmentQuestionsService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some questions', () => {
      expect(appController.getEnvironmentQuestions().length).toBeGreaterThan(0);
    });
  });
});
