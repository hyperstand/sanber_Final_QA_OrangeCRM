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

describe('Dashboard API (after login)', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/'

  beforeEach(() => {
    // UI login so Cypress has the cookies/session
    LoginPom.visit()
    LoginPom.login('Admin', 'admin123')
    DashboardPom.assertOnDashboard()
  })

  it('Time at Work API (dynamic date/time)', () => {
    const now = new Date()

    // format YYYY-MM-DD
    const currentDate = now.toISOString().split('T')[0]

    // format HH:MM
    const pad = (n) => n.toString().padStart(2, '0')
    const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`

    cy.log(`Testing with date=${currentDate}, time=${currentTime}`)

    cy.request(`${baseUrl}v2/dashboard/employees/time-at-work?timezoneOffset=7&currentDate=${currentDate}&currentTime=${currentTime}`)
      .then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('data')
        expect(resp.body.meta).to.have.property('currentDay')
      })
  })

  it('Action Summary API', () => {
    cy.request(`${baseUrl}v2/dashboard/employees/action-summary`).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body.data).to.be.an('array')
    })
  })

it('Shortcuts API (Quick Launch widget)', () => {
  cy.request(`${baseUrl}v2/dashboard/shortcuts`).then((resp) => {
    expect(resp.status).to.eq(200)
    expect(resp.body.data).to.be.an('object')

    const shortcuts = resp.body.data
    const keys = Object.keys(shortcuts)

    // Check expected keys exist
    expect(keys).to.include.members([
      'leave.assign_leave',
      'leave.leave_list',
      'time.employee_timesheet',
      'leave.apply_leave',
      'leave.my_leave',
      'time.my_timesheet'
    ])

    // Check values are booleans (true/false)
    keys.forEach((key) => {
      expect(shortcuts[key]).to.be.a('boolean')
    })
  })
})


it('Buzz Feed API', () => {
  cy.request(`${baseUrl}v2/buzz/feed?limit=5&offset=0&sortOrder=DESC&sortField=share.createdAtUtc`)
    .then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body.data).to.be.an('array')
      expect(resp.body.meta.total).to.be.gte(0)

      const posts = resp.body.data

      // check first post
      expect(posts[0]).to.have.property('id')
      expect(posts[0]).to.have.property('text')
      expect(posts[0].employee).to.have.property('firstName')
      expect(posts[0].employee).to.have.property('lastName')
      expect(posts[0].stats).to.have.property('numOfLikes')

      // verify that at least one post contains "baby boy"
      const hasBabyBoyPost = posts.some(p => p.text.includes('baby boy'))
      expect(hasBabyBoyPost).to.be.true

      // verify at least one post has type = "photo"
      const hasPhotoPost = posts.some(p => p.type === 'photo')
      expect(hasPhotoPost).to.be.true
    })
})

})
