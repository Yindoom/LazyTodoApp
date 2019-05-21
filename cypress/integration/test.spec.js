
import Chance from 'chance';
const chance = new Chance();

describe("Tests", () => {
  const email = chance.email();
  const password = "test123";

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  });


  it('redirects to login page by default', () => {
    cy.url().should('include', 'login');
  });

  it('has three buttons on the login page', () => {
    cy.get('button').should('have.length', 3);
  });

  it('should display an error when trying to log in with wrong email', () => {
    cy.get('input[formcontrolname=email]').type(email);
    cy.get('input[formcontrolname=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.get('h2').should('contain', "Error");
  });

  it('should log new user in when creating a new account', () => {
    cy.contains('Create').click();

    cy.get('input[formcontrolname=email]').type(email);
    cy.get('input[formcontrolname=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.url().should('contain', 'tasks');
  });

  it('has 2 buttons on the main page', () => {
    cy.get('button').should('have.length', 2);
  });

  it('should log user out and redirect to login page when logged out', () => {
    cy.contains('Log out').click();

    cy.url().should('contain', 'login');
  });

  it('should let a user log in with created email and password', () => {
    cy.get('input[formcontrolname=email]').type(email);
    cy.get('input[formcontrolname=password]').type(password);
    cy.get('button[type=submit]').click();

    cy.url().should('contain', 'tasks');
  });

  it('should show add task component when new checklist is clicked', () => {
    cy.contains('Checklist').click();

    cy.get('mat-dialog-container').should('be.visible');
  });

  it('should show subtask when added', () => {
    cy.contains('Checklist').click();
    cy.contains('+').click();

    cy.get('ul').should('have.length', 2);
  });

  it('should show task when task is added', () => {
    cy.contains('Checklist').click();
    cy.contains('+').click();
    cy.contains('Save').click();

    cy.get('ul').should('have.length', 1);
  });

  /*it('should reflect deletion of task', () => {
    cy.contains('Delete').click();
    cy.get('ul').should('not.exist')
  });*/
  it('should log out the user when all tests are done', () => {
    cy.contains('Log out').click();
  });
});
