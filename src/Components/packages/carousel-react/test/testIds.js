const makeTestID = (id) => "carousel-" + id;

export default {
    container: makeTestID("container"),
    arrowRight: makeTestID("arrow-r"),
    arrowLeft: makeTestID("arrow-l"),
    dot: makeTestID("dot-"),
    slidesContent: makeTestID("slides")
}