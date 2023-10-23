describe('Testing Spotify Playlist Creator app', () => {
    beforeEach(() => {
        cy.visit('https://splendid-cannoli-3d964e.netlify.app/')
    })

    it('should have the correct page title', () => {
        cy.title().should('eq', 'Spotify Playlist Creator')
    })

    // if single element
    it('should have correct heading', () => {
        cy.get('h1').should('have.text', 'Spotify Playlist Creator')
    });

    it('should not display ErrorModal', () => {
        cy.get('.ErrorModal').should('not.exist')
    });

    // if multiple elements
    it('should display login btn', () => {
        cy.get('button').eq(0).should('have.text', 'Login to Spotify')
    });

    it.only('should click login button and redirect', async function () {
        cy.get('button').eq(0)
            .click()
        // .click() yields the same subject it was given.
        // It is unsafe to chain further commands that rely on the subject after .click().    
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dplaylist-modify-private%2Bplaylist-modify-public%26response_type%3Dtoken%26redirect_uri%3Dhttps%253A%252F%252Fsplendid-cannoli-3d964e.netlify.app%252F%26client_id%3D729d39534cfd4763a631878608423ba6")
        })
    })
})