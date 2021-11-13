describe('TASK 5 - LABYRINTH CHALLENGE', () => {
    it('Maze Static - 130 points', () => {
        cy.visit('http://hackathon-maze.herokuapp.com/static/');
        cy.get('body').type('{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{upArrow}{upArrow}{rightArrow}{rightArrow}{rightArrow}')
        cy.get('body').type('{upArrow},{upArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{downArrow}')
        cy.get('body').type('{downArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{downArrow}{downArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{downArrow}{downArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{downArrow}{downArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{downArrow}{downArrow}')
        cy.get('body').type('{leftArrow}{leftArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{downArrow}{downArrow}{leftArrow}{downArrow}{downArrow}{downArrow}{downArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{downArrow}{downArrow}{downArrow}{downArrow}{leftArrow}{leftArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}')
        cy.get('body').type('{downArrow}{downArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{downArrow}{downArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{upArrow}{upArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{upArrow}')
        cy.get('body').type('{upArrow}{rightArrow}{upArrow}{upArrow}{upArrow}{upArrow}')
        cy.get('body').type('{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{upArrow}{upArrow}{leftArrow}{leftArrow}{upArrow}{upArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{upArrow}{upArrow}{upArrow}{upArrow}')
        cy.get('body').type('{leftArrow}{leftArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{downArrow}{upArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{downArrow}{downArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}')
        cy.get('body').type('{rightArrow}{rightArrow}{downArrow}{downArrow}{downArrow}{rightArrow}{leftArrow}')
        cy.get('body').type('{downArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{downArrow}{downArrow}{downArrow}{downArrow}')
        cy.get('body').type('{leftArrow}{leftArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{leftArrow}{leftArrow}')
        cy.get('body').type('{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}')
    });
});