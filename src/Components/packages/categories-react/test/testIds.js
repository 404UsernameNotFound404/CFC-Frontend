const makeTestID = (id) => "categories-" + id;

export default {
    container: makeTestID("container"),
    categoryButton: (id) => makeTestID("category-button-")
}