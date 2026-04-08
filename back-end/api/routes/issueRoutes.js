const helperController = require('../controllers/issueController');

module.exports = app => {
  app
    .route('/issues')
    .get(helperController.list_all_issues)
    .post(helperController.create_an_issue);

  app
    .route('/issues/:issueId')
    .get(helperController.read_an_issue)
    .put(helperController.update_an_issue)
    .delete(helperController.delete_an_issue);
};
