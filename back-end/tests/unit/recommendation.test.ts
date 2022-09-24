import { jest } from '@jest/globals';
import { recommendationService } from '../../src/services/recommendationsService';
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import * as recommendationFactory from '../factories/recommendationFactory';

describe('Testes unitários do recommentation service', () => {
    it('Deve criar uma recomendação', async () => {
        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementation((): any => { });

        jest
            .spyOn(recommendationRepository, 'create')
            .mockImplementation((): any => { });

        await recommendationService.insert(recommendationFactory.createRecommendation());

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it('Deve falhar ao tentar criar uma recomendação ja existente', async () => {
        jest
            .spyOn(recommendationRepository, 'findByName')
            .mockImplementation((): any => recommendationFactory.createRecommendation());

        jest
            .spyOn(recommendationRepository, 'create')
            .mockImplementation((): any => { });

        const promise = recommendationService.insert(recommendationFactory.createRecommendation());

        expect(recommendationRepository.findByName).toBeCalled();
        expect(promise).rejects.toEqual({
            type: "conflict",
            message: "Recommendations names must be unique"
        });
    });

    it('Deve aumentar os scores de uma recomendação', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => true);

        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementation((): any => { });

        await recommendationService.upvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('Deve falhar ao tentar aumentar os scores de uma recomendação que não existe', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => false);


        const promise = recommendationService.upvote(1);

        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it('Deve reduzir os scores de uma recomendação', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => true);

        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementation((): any => { return { score: 0 } });

        await recommendationService.downvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('Deve falhar ao tentar reduzir os scores de uma recomendação que não existe', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => false);

        const promise = recommendationService.downvote(1);

        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it('Deve reduzir os scores de uma recomendação a ponto dela ser apagada', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => true);

        jest
            .spyOn(recommendationRepository, 'updateScore')
            .mockImplementation((): any => { return { score: -6 } });

        jest
            .spyOn(recommendationRepository, 'remove')
            .mockImplementation((): any => { });

        await recommendationService.downvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });

    it('Deve retornar uma recomendação aleatoria', async () => {
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementation((): any => recommendationFactory.createRecommendationList());

        const recommendation = await recommendationService.getRandom();

        expect(recommendationRepository.findAll).toBeCalled();
        expect(recommendation).toBeInstanceOf(Object);
    });

    it('Deve falhar ao tentar retornar uma recomendação aleatoria por não existirem recomendações', async () => {
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementation((): any => []);

        const promise = recommendationService.getRandom();

        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it('Deve retornar todas as recomendações', async () => {
        jest
            .spyOn(recommendationRepository, 'findAll')
            .mockImplementation((): any => []);

        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });

    it('Deve retornar uma recomendação pelo id', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => recommendationFactory.createRecommendation);

        const recommendation = await recommendationService.getById(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendation).toBeInstanceOf(Object);
    });

    it('Deve falhar ao tentar retornar uma recomendação por um id inexistente', async () => {
        jest
            .spyOn(recommendationRepository, 'find')
            .mockImplementation((): any => false);

        const promise = recommendationService.getById(1);

        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    });

    it('Deve retornar uma lista com as recomendações pelo score', async () => {
        jest
            .spyOn(recommendationRepository, 'getAmountByScore')
            .mockImplementation((): any => []);

        await recommendationService.getTop(1);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

});