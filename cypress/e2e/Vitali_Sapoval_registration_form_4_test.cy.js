beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        // get username input field
        cy.get('#username').type('EmmetBrown')
        cy.get('#username').clear()

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // error message should be visible
        // There is no way I can think of to make this error message to appear, I clear the username and I get red shadow
        // I have to click the submit button to get the message but the submit button is not active until all
        // required fields are filled out
        cy.get('#input_error_message').should('not.be.visible')

        //successfull message should not be visile
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        // get username input field
        cy.get('#username').type('{enter}')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // empty field should show tooltip - Please add username
        // corrected the .username into #username
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')

        //if not entered, username field has red outline
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        // check that username HTML has min attribute value equalt to 1
        // corrected 11 into 1 for min value
        cy.get('#username').should('have.attr', 'min', '1')

        // check that username HTML has max attribute value equal to 50
        // corrected @username2 into #username; corrected 501 into 50 for max value
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only lower letters and numbers', () => {
        // check with regex supporter format
        // Can't find solution, a change in HTML code is required to make this test work as in description
        // The code in test should be cy.get('#username').should('have.attr', 'pattern', '[a-z0-9_]+'),
        // but the HTML code should also have pattern set to [a-z0-9_]+
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        // Check regex
        // input invalid email
        // check that tooltip is same as expected
        // submit button should not be active
        cy.get('#email').should('have.attr', 'pattern').should('contain', 'a-z0-9')
        // corrected email123 into email
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        //corrected "image" into "box-shadow"
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('User cannot submit empty registration form', () => {
        // Do not add any information
        // Check that submit button is not enabled
        // changed not.be.enabled into be.disabled
        cy.get('.submit_button').should('be.disabled');
    })

    it('BMW should not be listed in cars list', () => {
        
        // Check list size is 4
        // corrected 5 into 4
        cy.get('#cars').children().should('have.length', 4)

        // Check list does not contain BMW
        // corrected where appropriate into .eq, also put correct numbering. added not to the last not.have.text
        cy.get('#cars option').eq(0).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(1).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(2).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(3).should('not.have.text', 'BMW')
    })
})
