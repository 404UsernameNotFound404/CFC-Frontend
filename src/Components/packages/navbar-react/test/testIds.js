const makeTestID = (id) => "activist-card-" + id;

export default {
    mobile: {
        container: makeTestID("mobile-container"),
        openButton: makeTestID("mobile-open-button"),
        links: makeTestID("mobile-links")
    },
    desktop: {
        container: makeTestID("desktop-container")
    }
}