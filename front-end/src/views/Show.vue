<template>
  <div>
    <h1>Show Issue</h1>
    
    <div class="ui labeled input fluid">
      <div class="ui label"><i class="exclamation circle icon"></i> Issue Code</div>
      <input type="text" readonly :value="issue.issueCode" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="comment alternate icon"></i> Response</div>
      <input type="text" readonly :value="issue.response" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="tags icon"></i> Category</div>
      <input type="text" readonly :value="issue.category" />
    </div>

    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
        Edit issue
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      issue: ''
    };
  },
  async mounted() {
    this.issue = await api.getIssue(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
</style>
