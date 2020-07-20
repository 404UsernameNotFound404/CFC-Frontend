const makeTestID = (id) => "categories-" + id;

export default {
    container: makeTestID("container"),
    categoryButton: (id, isActive) => makeTestID("category-button-" + id + "-" + isActive)
}