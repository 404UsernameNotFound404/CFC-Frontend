const makeTestID = (id) => "org-card-" + id;

export default {
    orgCard: {
        container: makeTestID("card-container"),
        seeMore: makeTestID("card-see-more"),
        desc: makeTestID("card-desc")
    },
    
    createEditOrg: {
        container: makeTestID("creat-edit-container"),
        title: makeTestID("creat-edit-title"),
        deleteCheckbox: makeTestID("creat-edit-delete-checkbox"),
        createButton: makeTestID("creat-edit-create-button")
    }
}