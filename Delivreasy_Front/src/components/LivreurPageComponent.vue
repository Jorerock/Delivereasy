<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Header Section -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Mes Livraisons</h2>
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div class="w-full sm:w-auto">

          <input
            id="date-picker"
            type="date"
            v-model="selectedDate"
            @change="onTodoInput"
            class="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div 
      v-if="isLoading" 
      class="flex justify-center items-center py-8"
    >
      <div class="inline-flex items-center gap-2">
        <div class="w-6 h-6 border-2 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
        <span class="text-gray-600">Chargement des Livraisons...</span>
      </div>
    </div>

    <!-- Error State -->
    <div 
      v-if="error" 
      class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <!-- Error Icon -->
          <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Results Grid -->
    <div 
      v-if="!isLoading && monTableau.length > 0" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div 
        v-for="element in monTableau" 
        :key="element.List_ID"
        class="bg-white rounded-lg shadow-sm transition-transform duration-200 "
      >
        <ResultComponent
          v-if="element"
          :data="element"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="!isLoading && monTableau.length === 0 && selectedDate" 
      class="text-center py-12"
    >
      <div class="text-gray-400 mb-2">
        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p class="text-gray-500 text-lg">Pas de Livraisons à cette date</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ResultComponent from './ResultComponent.vue'

interface DeliveryData {
  List_ID: number;
  // Add other properties based on your actual data structure
  [key: string]: any;
}

const selectedDate = ref('')
const isLoading = ref(false)
const error = ref('')
const monTableau = ref<DeliveryData[]>([])

const onTodoInput = async () => {
  if (!selectedDate.value) {
    error.value = 'Please select a date'
    return
  }

  try {
    error.value = ''
    isLoading.value = true
    
    const usersRequest = await fetch(`http://localhost:3000/Livreur/Livraisons`, {
      method: 'post',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Tournee_Jour: selectedDate.value,
        Utilisateur_ID: 1,
      }),
    })

    if (!usersRequest.ok) {
      throw new Error(`Error: ${usersRequest.status}`)
    }

    const todos = await usersRequest.json()
    monTableau.value = [...todos]
    console.log('monTableau est mis à jour et la modification est envoyée au serveur')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred while fetching the data'
    monTableau.value = []
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>