class LoginPom {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    usernameField() { return cy.get("input[placeholder='Username']") }
    passwordField() { return cy.get("input[placeholder='Password']") }
    loginButton() { return cy.get('.oxd-button') }

    login(username, password) {
        
        if(username != ''){
            this.usernameField().type(username)
        }
        if(password != ''){
            this.passwordField().type(password)
        }
        
        this.loginButton().click()
    }
    clickLoginButton() {
        this.loginButton().click()
    }
}

export default new LoginPom()