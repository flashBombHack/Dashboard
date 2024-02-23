import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';

import Login from './components/login.vue';
import ComingSoon from './components/ComingSoon.vue';
import Dashboard from './components/Dashboard.vue';
import Plugin from './components/Plugin.vue';
import Packages from './components/Packages.vue';


//--------------------------------------------------------------------//

const app = createApp({});
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true}},
    // { path: '/categories', name: 'categories', component: Categories, meta: { requiresAuth: true, salesExecutiveRestricted: true } },
    { path: '/comingsoon', component: ComingSoon, meta: { requiresAuth: true, salesExecutiveRestricted: true } },
     { path: '/plugin', name: 'dashboard-plugin', component: Plugin,meta: { requiresAuth: true}},
     { path: '/packages', name: 'dashboard-packages', component: Packages, meta: { requiresAuth: true}},
    


  ],
  app: {
    config: app.config,
  },
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = () => {
       
        const token = sessionStorage.getItem('token');
        return !!token;
    };

    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else if (!to.meta.requiresAuth && isAuthenticated()) {
        next('/dashboard');
    } else {
        
        next();
    }
});




window.addEventListener('popstate', () => {
  const currentRoute = router.currentRoute.value;

  if (currentRoute.path == '/dashboard' && currentRoute.matched.some(record => record.meta.requiresAuth)) {
  
    const confirmation = window.confirm('Your session has expired. You will be logged out.');
    if (confirmation) {
      sessionStorage.removeItem('token');
      router.push('/login');
    }
  }
});


export default router;
