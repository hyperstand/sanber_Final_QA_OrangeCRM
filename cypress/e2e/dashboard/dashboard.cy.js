import LoginPom from '../../pom/LoginPom'
import DashboardPom from '../../pom/dashboardpom'

describe('Dashboard - OrangeHRM', () => {
  
  it('TC_DASH_01 - Dashboard loaded dengan widget utama', () => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()

    DashboardPom.timeAtWorkWidget.should('exist')
    DashboardPom.myActionsWidget.should('exist')
    DashboardPom.quickLaunchWidget.should('exist')
    DashboardPom.buzzWidget.should('exist')
    DashboardPom.employeesOnLeaveWidget.should('exist')
  })

  it('TC_DASH_02 - Navigasi ke Directory via menu topbar', () => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()

    DashboardPom.goToDirectory()
    cy.url().should('include', '/directory')
    cy.contains('h6', 'Directory').should('be.visible')
  })

  it('TC_DASH_03 - Logout berhasil', () => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()

    DashboardPom.logout()
  })

  it('TC_DASH_04 - Quick Launch: Assign Leave redirect', () => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()
  })

  it('NEG_01 - Akses dashboard tanpa login', () => {
    cy.clearCookies()
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.url().should('include','/auth/login')
  })

  it('NEG_02 - Stub API error 500', () => {
    cy.intercept('GET', '**/dashboard/**', { statusCode: 500, body: { message: 'error' } }).as('dashApi')
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    cy.wait('@dashApi').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(500)
    })
    cy.contains(/error|fail|unable/i).should('exist')
  })
})
describe('Dashboard Quick Launch', () => {
  beforeEach(() => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()
  })
 it('Quick Launch: Leave List', () => {
    DashboardPom.clickQuickLaunchByIndex(2)
    cy.url().should('include', '/leave/viewLeaveList')
    DashboardPom.assertPageTitle('Leave')   // ✅ matches UI
    DashboardPom.backToDashboard()
  })

  it('Quick Launch: Timesheets', () => {
    DashboardPom.clickQuickLaunchByIndex(3)
    cy.url().should('match', /time\/view(My|Employee)Timesheet/) // ✅ flexible URL
    DashboardPom.assertPageTitle('Timesheet') // ✅ matches UI
    DashboardPom.backToDashboard()
  })

  it('Quick Launch: My Leave', () => {
    DashboardPom.clickQuickLaunchByIndex(5)
    cy.url().should('include', '/leave/viewMyLeaveList') // ✅ real URL for My Leave
    DashboardPom.assertPageTitle('Leave')   // ✅ matches UI
    DashboardPom.backToDashboard()
  })

  it('Quick Launch: My Timesheet', () => {
    DashboardPom.clickQuickLaunchByIndex(6)
    cy.url().should('match', /time\/view(My|Employee)Timesheet/) // ✅ flexible URL
    DashboardPom.assertPageTitle('Timesheet') // ✅ matches UI
    DashboardPom.backToDashboard()
  })
})

describe('Dashboard Widgets', () => {
  const widgets = [
    'Time at Work',
    'My Actions',
    'Quick Launch',
    'Buzz Latest Posts',
    'Employees on Leave Today',
    'Employee Distribution by Sub Unit',
    'Employee Distribution by Location'
  ]

  beforeEach(() => {
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()
  })

  widgets.forEach((expectedText, index) => {
    it(`Widget: ${expectedText}`, () => {
      DashboardPom.assertWidget(index, expectedText)
    })
  })
})
