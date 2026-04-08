import Vue from 'vue';
import Router from 'vue-router';
import Issues from './views/Issues.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/issues'
    },
    {
      path: '/issues',
      name: 'issues',
      component: Issues
    },
    {
      path: '/issues/new',
      name: 'new-issue',
      component: New
    },
    {
      path: '/issues/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/issues/:id/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
});
