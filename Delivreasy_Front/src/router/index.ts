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
      name: 'MesLivraisons',
      path:'/MesLivraisons',
      component: LivreurPageComponent
      // component: LoginPageComponent
    },
    {
      name: 'Welcome',
      path:'/Welcome',
      component: WelcomePageComponent
    }
  ]
});

export default router;
