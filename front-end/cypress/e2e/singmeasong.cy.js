import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request('POST', 'http://localhost:5000/e2e/reset', {});
});

describe('Testa criação, interações com as recomendações e as rotas', () => {
  it('Deve testar todas as funcionalidades do app', () => {
    cy.visit('http://localhost:3000');

    cy.get('#name').type(faker.music.songName());

    cy.get('#youtubeLink').type('https://www.youtube.com/watch?v=3ySIycyNkUY');

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('insertRecommendation');
    cy.intercept('GET', 'http://localhost:5000/recommendations').as('getRecommendations');
    cy.get('#submit').click();

    cy.wait('@insertRecommendation');
    cy.wait('@getRecommendations');

    cy.get('#name').type(faker.music.songName());

    cy.get('#youtubeLink').type('https://www.youtube.com/watch?v=3ySIycyNkUY');

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('insertRecommendation');
    cy.intercept('GET', 'http://localhost:5000/recommendations').as('getRecommendations');
    cy.get('#submit').click();

    cy.wait('@insertRecommendation');
    cy.wait('@getRecommendations');

    cy.get('#upvote').click();
    cy.get('#upvote').click();
    cy.get('#downvote').click();

    cy.get('#top').click();
    cy.url().should('equal', 'http://localhost:3000/top');

    cy.get('#random').click();
    cy.url().should('equal', 'http://localhost:3000/random');

    cy.get('#home').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
})