<template>
  <div>
    <h1>Helpdesk Issues</h1>
    <table id="issues" class="ui celled compact table">
      <thead>
        <tr>
          <th>Issue Code</th>
          <th>Response Text</th>
          <th>Category</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(issue, i) in issues" :key="i">
          <td>{{ issue.issueCode }}</td>
          <td>{{ issue.response }}</td>
          <td>{{ issue.category }}</td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: issue._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: issue._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned" @click.prevent="onDestroy(issue._id)">
            <a :href="`/issues/${issue._id}`">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'issues',
  data() {
    return {
      issues: []
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure you want to delete this issue?');
      if (!sure) return;
      await api.deleteIssue(id);
      this.flash('Issue deleted successfully!', 'success');
      const newIssues = this.issues.filter(w => w._id !== id);
      this.issues = newIssues;
    }
  },
  async mounted() {
    this.issues = await api.getIssues();
  }
};
</script>
