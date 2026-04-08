const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');

exports.list_all_issues = (req, res) => {
  Issue.find({}, (err, issues) => {
    if (err) res.send(err);
    res.json(issues);
  });
};

exports.create_an_issue = (req, res) => {
  const newIssue = new Issue(req.body);
  newIssue.save((err, issue) => {
    if (err) res.send(err);
    res.json(issue);
  });
};

exports.read_an_issue = (req, res) => {
  Issue.findById(req.params.issueId, (err, issue) => {
    if (err) res.send(err);
    res.json(issue);
  });
};

exports.update_an_issue = (req, res) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    req.body,
    { new: true },
    (err, issue) => {
      if (err) res.send(err);
      res.json(issue);
    }
  );
};

exports.delete_an_issue = (req, res) => {
  Issue.deleteOne({ _id: req.params.issueId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'Issue successfully deleted',
      _id: req.params.issueId
    });
  });
};
