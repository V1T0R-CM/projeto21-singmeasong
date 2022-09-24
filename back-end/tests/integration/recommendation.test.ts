import { array } from "joi";
import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import * as recommendationFactory from '../factories/recommendationFactory';


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
});

describe('Teste rota POST /recommendations', () => {
    it("Deve criar uma recomendação e retornar status 201", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        const result = await supertest(app).post("/recommendations").send(recommendation);
        const registredRecommendation = prisma.recommendation.findUnique({ where: { id: result.body.id } });

        expect(result.status).toBe(201);
        expect(registredRecommendation).toBeInstanceOf(Object);
    });

    it("Deve tentar criar uma recomendação passando um body no formato errado e retornar status 422", async () => {
        const recommendation = {};
        const result = await supertest(app).post("/recommendations").send(recommendation);

        expect(result.status).toBe(422);
    });

    it("Deve tentar criar uma recomendação ja existente e retornar status 409", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        await supertest(app).post("/recommendations").send(recommendation);
        const result = await supertest(app).post("/recommendations").send(recommendation);

        expect(result.status).toBe(409);
    });

    it("Deve dar upvote em uma recomendação e retornar status 200", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        await supertest(app).post("/recommendations").send(recommendation);
        const id = (await prisma.recommendation.findUnique({ where: { name: recommendation.name } })).id
        const result = await supertest(app).post(`/recommendations/${id}/upvote`);

        expect(result.status).toBe(200);
    });

    it("Deve tentar dar upvote em um id de recomendação inexistente e retornar status 404", async () => {
        const result = await supertest(app).post("/recommendations/0/upvote");

        expect(result.status).toBe(404);
    });

    it("Deve dar downvote em uma recomendação e retornar status 200", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        await supertest(app).post("/recommendations").send(recommendation);
        const id = (await prisma.recommendation.findUnique({ where: { name: recommendation.name } })).id
        const result = await supertest(app).post(`/recommendations/${id}/downvote`);

        expect(result.status).toBe(200);
    });

    it("Deve tentar dar downvote em um id de recomendação inexistente e retornar status 404", async () => {
        const result = await supertest(app).post("/recommendations/0/downvote");

        expect(result.status).toBe(404);
    });

    it("Deve dar downvote em uma recomendação e retornar status 200", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        await supertest(app).post("/recommendations").send(recommendation);
        const id = (await prisma.recommendation.findUnique({ where: { name: recommendation.name } })).id;
        await prisma.recommendation.update({ where: { id: id }, data: { score: -5 } });
        const result = await supertest(app).post(`/recommendations/${id}/downvote`);
        const deletedRecommendation = await prisma.recommendation.findUnique({ where: { id: id } });

        expect(result.status).toBe(200);
        expect(deletedRecommendation).toBeNull();
    });

    it("Deve retornar as 10 recomendações e retornar status 200", async () => {
        const result = await supertest(app).get("/recommendations")

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Deve retornar uma recomendação e retornar status 200", async () => {
        const recommendation = recommendationFactory.createRecommendation();
        await supertest(app).post("/recommendations").send(recommendation);
        const id = (await prisma.recommendation.findUnique({ where: { name: recommendation.name } })).id
        const result = await supertest(app).get(`/recommendations/${id}`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Deve tentar retornar uma recomendação com id inexistente e retornar status 404", async () => {
        const result = await supertest(app).get("/recommendations/0");

        expect(result.status).toBe(404);
    });

    it("Deve retornar uma recomendação aleatoria e retornar status 200", async () => {
        await supertest(app).post("/recommendations").send(recommendationFactory.createRecommendation());
        await supertest(app).post("/recommendations").send(recommendationFactory.createRecommendation());
        await supertest(app).post("/recommendations").send(recommendationFactory.createRecommendation());

        const result = await supertest(app).get(`/recommendations/random`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Deve tentar retornar uma recomendação aleatoria sem existir nebhuma recomendação salva e retornar status 404", async () => {
        await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;

        const result = await supertest(app).get(`/recommendations/random`);

        expect(result.status).toBe(404);
    });

    it("Deve retornar uma lista de tamanho 'amount' recomendações ordenadas pelo score e retornar status 200", async () => {
        const recommendation1 = recommendationFactory.createRecommendation()
        await supertest(app).post("/recommendations").send(recommendation1);
        const recommendation1id = await (await prisma.recommendation.findUnique({ where: { name: recommendation1.name } })).id;
        await prisma.recommendation.update({ where: { id: recommendation1id }, data: { score: 65 } });

        const recommendation2 = recommendationFactory.createRecommendation()
        await supertest(app).post("/recommendations").send(recommendation2);
        const recommendation2id = await (await prisma.recommendation.findUnique({ where: { name: recommendation2.name } })).id;
        await prisma.recommendation.update({ where: { id: recommendation2id }, data: { score: 45 } });

        const recommendation3 = recommendationFactory.createRecommendation()
        await supertest(app).post("/recommendations").send(recommendation3);
        const recommendation3id = await (await prisma.recommendation.findUnique({ where: { name: recommendation3.name } })).id;
        await prisma.recommendation.update({ where: { id: recommendation3id }, data: { score: 25 } });

        const result = await supertest(app).get(`/recommendations/top/2`);

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);

    });
});
