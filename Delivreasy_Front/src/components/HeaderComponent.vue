<script setup lang="ts">
import * as cookie from './Cookie';
import { ref,computed } from 'vue';

const isOpen = ref(false);

const isTokenValid = () => {
  const isAdmin =  cookie.getCookie('isAdmin');
 
  console.log('isAdmin : '+isAdmin)
  return isAdmin; // Simple check, replace with actual token validation logic
};
const showAdminView = computed(() => {
  const isAdmin = cookie.getCookie('isAdmin') === '1';
  return isAdmin;
});

const showLivreurView = computed(() => {
  const isAdmin = cookie.getCookie('isAdmin') === '0';
  return isAdmin;
});

</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mobile menu button -->
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <a href="/login"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Login
              </a>
              <a  href="/Welcome"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Welcome
              </a>
              <a  v-if="showAdminView" href="/GestionsUser"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Gestion Utilisateur
              </a>
              <a  v-if="showAdminView" href="/GestionsClient"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Gestion Client
              </a>
              <a  v-if="showAdminView" href="/GestionsLivraison"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Gestion Livraison
              </a>
              <a  v-if="showAdminView" href="/GestionsTournee"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Gestion Tournée
              </a>
              <a href="/MesLivraisons"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Mes Livraisons
              </a>
              <a  v-if="showAdminView" href="/GestionsObjet"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                Gestion Objet
              </a>


              
            </div>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="h-6 w-6" :class="{'hidden': isOpen, 'block': !isOpen}" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="h-6 w-6" :class="{'block': isOpen, 'hidden': !isOpen}" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div class="md:hidden" :class="{'block': isOpen, 'hidden': !isOpen}">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="/login"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Login
        </a>
        <a href="/Welcome"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Welcome
        </a>
        <a href="/GestionsUser"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Gestion Utilisateur
        </a>
        <a href="/GestionsClient"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Gestion Client
        </a>
        <a href="/GestionsLivraison"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Gestion Livraison
        </a>
        <a href="/GestionsTournee"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Gestion Tournée
        </a>
        <a href="/MesLivraisons"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
          Mes Livraisons
        </a>
      </div>
    </div>
  </nav>
</template>