import ForgotPasswordPom from '../../pom/ForgotPasswordPom'
import LoginPom from '../../pom/LoginPom'

describe('Forgot Password - OrangeHRM (POM + Intercept)', () => {
  
  it('FP01 — Reset password dengan username valid', () => {
    ForgotPasswordPom.visit()
    ForgotPasswordPom.resetPassword('Admin')
    // bisa intercept kalau mau assert request API
    //cy.get('.oxd-text--h6').should('contain', 'Reset Password link sent successfully').or('exist')
  })

  it('FP02 — Tidak isi username (field kosong)', () => {
    ForgotPasswordPom.visit()
    ForgotPasswordPom.resetPassword(null)  // skip isi username
    //ForgotPasswordPom.requiredError.should('contain', 'Required')
  })

  it('FP03 — Klik Cancel kembali ke halaman login', () => {
    ForgotPasswordPom.visit()
    ForgotPasswordPom.cancel()
    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')
  })
})
