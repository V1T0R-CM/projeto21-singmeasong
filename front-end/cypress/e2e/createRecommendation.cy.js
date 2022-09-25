import { faker } from "@faker-js/faker";

describe('Testa interações com as recomendações', () => {
  it('Deve criar uma nova recomendação', () => {
    cy.visit('http://localhost:3000');

    cy.get('#name').type(faker.music.songName());

    cy.get('#youtubeLink').type('https://www.youtube.com/watch?v=3ySIycyNkUY');

    //cy.intercept('POST', 'http//localhost:5000/recommendations').as('insertRecommendation');
    //cy.intercept('GET', 'http//localhost:5000/recommendations').as('getRecommendations');

    cy.get('#submit').click();

    //cy.wait('@insertRecommendation');
    //cy.wait('@getRecommendations');
  })
})