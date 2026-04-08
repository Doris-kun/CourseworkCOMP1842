<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="exclamation circle icon"></i> Issue Code</div>
      <input type="text" placeholder="e.g. PWD_RESET" v-model="issue.issueCode" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="comment alternate icon"></i> Response</div>
      <input type="text" placeholder="e.g. Please click the link..." v-model="issue.response" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label"><i class="tags icon"></i> Category</div>
      <select v-model="issue.category" style="flex: 1 0 auto; border: 1px solid rgba(34,36,38,.15); border-radius: 0 4px 4px 0; padding: 0.6em;">
        <option value="" disabled>--- Select a Category ---</option>
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
        <option value="Network">Network</option>
        <option value="Account">Account</option>
        <option value="Security">Security</option>
        <option value="Billing">Billing</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'issue-form',
  props: {
    issue: {
      type: Object,
      required: false,
      default: () => {
        return {
          issueCode: '',
          response: '',
          category: ''
        };
      }
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function() {
      if (this.issue.issueCode === '' || this.issue.response === '' || this.issue.category === '') {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        this.$emit('createOrUpdate', this.issue);
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
