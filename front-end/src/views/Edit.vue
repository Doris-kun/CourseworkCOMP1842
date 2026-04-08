<template>
  <div>
    <h1>Edit Issue</h1>
    <issue-form @createOrUpdate="createOrUpdate" :issue="this.issue"></issue-form>
  </div>
</template>

<script>
import issueForm from '../components/IssueForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'issue-form': issueForm
  },
  data() {
    return {
      issue: {}
    };
  },
  methods: {
    createOrUpdate: async function(issue) {
      await api.updateIssue(issue);
      this.flash('Issue updated successfully!', 'success');
      this.$router.push(`/issues/${issue._id}`);
    }
  },
  async mounted() {
    this.issue = await api.getIssue(this.$route.params.id);
  }
};
</script>
