class ForgotPasswordPom {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
  }

  get usernameField() { return cy.get('input[name="username"]') }
  get resetButton()   { return cy.contains('button', 'Reset Password') }
  get cancelButton()  { return cy.contains('button', 'Cancel') }
  get successNotice() { return cy.get('.oxd-text--h6, .oxd-text--subtitle-2') }
  get requiredError() { return cy.get('.oxd-input-field-error-message') }

  resetPassword(username) {
    if (username) {
      this.usernameField.clear().type(username)
    }
    this.resetButton.click()
  }

  cancel() {
    this.cancelButton.click()
  }
}

export default new ForgotPasswordPom()
