<template>
  <div>
    <h1>New Issue</h1>
    <issue-form @createOrUpdate="createOrUpdate"></issue-form>
  </div>
</template>

<script>
import issueForm from '../components/IssueForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'new-issue',
  components: {
    'issue-form': issueForm
  },
  methods: {
    createOrUpdate: async function(issue) {
      const res = await api.createIssue(issue);
      this.flash('Issue created successfully!', 'success');
      this.$router.push(`/issues/${res._id}`);
    }
  }
};
</script>
