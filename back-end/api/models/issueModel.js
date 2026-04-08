const mongoose = require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema(
  {
    issueCode: {
      type: String,
      required: 'Issue code cannot be blank'
    },
    response: {
      type: String,
      required: 'Response cannot be blank'
    },
    category: {
      type: String,
      required: 'Category cannot be blank',
      default: 'General'
    }
  },
  { collection: 'issues' }
);

module.exports = mongoose.model('Issue', IssueSchema);
