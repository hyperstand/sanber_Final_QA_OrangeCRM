class DashboardPom {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  }

  // Locators
  get header() { return cy.contains('h6', 'Dashboard') }
  get timeAtWorkWidget() { return cy.contains('p', 'Time at Work') }
  get myActionsWidget() { return cy.contains('p', 'My Actions') }
  get quickLaunchWidget() { return cy.contains('p', 'Quick Launch') }
  get buzzWidget() { return cy.contains('p', 'Buzz Latest Posts') }
  get employeesOnLeaveWidget() { return cy.contains('p', 'Employees on Leave Today') }
  get profileMenu() { return cy.get('.oxd-userdropdown') }
  get logoutLink() { return cy.contains('a', 'Logout') }

  // Actions
  assertOnDashboard() {
    //cy.url().should('include', '/dashboard')
    this.header.should('be.visible')
  }

  logout() {
    this.profileMenu.click()
    this.logoutLink.click()
  }

  goToDirectory() {
    cy.contains('a', 'Directory').click()
  }

  quickLaunch(option) {
    cy.contains('Quick Launch').parents('.oxd-sheet').within(() => {
      cy.contains(option).click()
    })
  }

  assertOnDashboard() {
    cy.contains('p', 'Quick Launch').should('be.visible')
  }

  clickQuickLaunch(title) {
    cy.get('.orangehrm-quick-launch-card')
      .contains('p', title)
      .click()
  }

  assertPageTitle(title) {
    cy.get('.oxd-text.oxd-text--h6').should('have.text', title)
  }

  backToDashboard() {
    cy.go('back')
    this.assertOnDashboard()
  }
    assertOnDashboard() {
    cy.contains('p', 'Quick Launch').should('be.visible')
  }

  clickQuickLaunchByIndex(index) {
    cy.get(`.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(${index}) button`).click()
  }

  assertPageTitle(title) {
    cy.get('.oxd-text.oxd-text--h6').should('have.text', title)
  }

  backToDashboard() {
    cy.go('back')
    this.assertOnDashboard()
  }

  assertPageTitle(title) {
  cy.get('.oxd-text.oxd-text--h6')
    .should('include.text', title)
}
 widgets() {
    return cy.get('.orangehrm-dashboard-widget-header .oxd-text')
  }

  assertWidget(index, expectedText) {
    this.widgets().eq(index).should('have.text', expectedText)
  }

  assertOnDashboard() {
    cy.contains('p', 'Quick Launch').should('be.visible')
  }
}

export default new DashboardPom()
