
import LoginPage from '../../pom/LoginPom.js'

describe('Login - OrangeHRM (POM + Intercept)', () => {
//positive
it('TC01 — Login sukses dengan kredensial valid', () => {
    LoginPage.visit()
    LoginPage.login('Admin', 'admin123')
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
      .should('have.text', 'Dashboard')
})
// it('TC02 — Validasi: field kosong', () => {
//     LoginPage.visit()
//     //LoginPage.login(null, null)
//    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('have.text', 'Required');
//     //cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
// })
it('TC02 — Gagal login: password salah', () => {
    LoginPage.visit()
    LoginPage.login('Admin', 'xxxx')
    cy.contains('Invalid credentials').should('be.visible')
})

it('TC03 — Validasi: field kosong', () => {
    LoginPage.visit()
    LoginPage.login('', '')
   cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
   cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
    //cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
})
it('TC04 — Validasi: field kosong password', () => {
    LoginPage.visit()
    LoginPage.login('a', '')
   //cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
  //  cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
})
it('TC05 — Validasi: field kosong usernamw', () => {
    LoginPage.visit()
    LoginPage.login('', 'A')
   cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
  //  cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
    //cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > form:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(3)').should('have.text', 'Required');
})

// it('TC04 — Gagal login: username salah', () => {
//     LoginPage.login('abc', 'admin123')
//     cy.contains('Invalid credentials').should('be.visible')
// })


})