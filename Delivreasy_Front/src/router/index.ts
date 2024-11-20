import * as cookie from '../components/Cookie';

import AboutPageComponent from '@/components/AboutPageComponent.vue';
import LoginPageComponent from '../components/LoginPageComponent.vue';
// import TodosPageComponent from '@/components/TodosPageComponent.vue';
import GestionsUserPageComponent from '@/components/GestionsUserPageComponent.vue';
import WelcomePageComponent from '@/components/WelcomePageComponent.vue';

import { createRouter, createWebHistory } from 'vue-router';
import GestionsClientPageComponent from '@/components/GestionsClientPageComponent.vue';
import GestionsLivraisonPageComponent from '@/components/GestionsLivraisonPageComponent.vue';
import GestionsTourneePageComponent from '@/components/GestionsTourneePageComponent.vue';
import LivreurPageComponent from '@/components/LivreurPageComponent.vue';
// import NewGestionsUserPageComponent from '@/components/NewGestionsUserPageComponent.vue';
import GestionsObjetPageComponent from '@/components/GestionsObjetPageComponent.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'about',
      path:'/about',
      component: AboutPageComponent
    },
    {
      name: 'login',
      path:'/login',
      component: LoginPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'GestionsUser',
      path:'/GestionsUser',
      component: GestionsUserPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'GestionsClient',
      path:'/GestionsClient',
      component: GestionsClientPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'GestionsLivraison',
      path:'/GestionsLivraison',
      component: GestionsLivraisonPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'GestionsTournee',
      path:'/GestionsTournee',
      component: GestionsTourneePageComponent
      // component: LoginPageComponent
    },    
    {
      name: 'GestionsObjet',
      path:'/GestionsObjet',
      component: GestionsObjetPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'MesLivraisons',
      path:'/MesLivraisons',
      component: LivreurPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'Welcome',
      path:'/Welcome',
      component: WelcomePageComponent,
      meta: { requiresAuth: true } // Mark this route as requiring authentication
    }
  ]
});



const isTokenValid = () => {
  const isAdmin =  cookie.getCookie('isAdmin');
 
  console.log('isAdmin : '+isAdmin)
  return isAdmin; // Simple check, replace with actual token validation logic
};

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (!isTokenValid()) {
      // Redirect to login if no valid token
      next('/login');
    } else {
      next(); // Proceed to the route
    }
  } else {
    next(); // Always allow access to non-authenticated routes
  }
});


export default router;
