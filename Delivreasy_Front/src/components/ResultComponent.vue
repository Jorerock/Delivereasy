<template>
  <div class="w-full p-4">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Card header -->
      <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Detaille de la Livraison</h3>
      </div>

      <!-- Mobile view (card layout) -->
      <div class="block sm:hidden">
        <button
          @click="showModal = true,OnTourneeInput(data)  "

          class="w-full p-4 hover:bg-gray-50 transition-colors duration-150"
        >
          <div class="space-y-3">
            <div>
              <label class="text-xs font-medium text-gray-500 uppercase">Addresse</label>
              <p class="mt-1 text-sm text-gray-900">{{ data.Livraison_Adresse }}</p>
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 uppercase">Commentaire</label>
              <p class="mt-1 text-sm text-gray-900">{{ data.Livraison_Commentaire_ }}</p>
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 uppercase">ID</label>
              <p class="mt-1 text-sm text-gray-900">{{ data.Livraison_ID }}</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Desktop view (table layout) -->
      <div class="hidden sm:block">
        <button
          @click="OnTourneeInput(data)"
          class="w-full"
        >
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Addresse
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commentaire
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                    {{ data.Livraison_Adresse }}
                  </td>
                  <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                    {{ data.Livraison_Commentaire_ }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ data.Livraison_ID }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </button>
      </div>
    </div>
    

    <!-- Loading state -->
    <div v-if="isLoading" class="mt-4 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
    </div>
  </div>



   <!-- Modal -->
   <div
      v-if="showModal"
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="showModal = false"
        ></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="showModal = false"
              class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Fermer</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Ajouter un nouveau
              </h3>
              <form @submit.prevent="" class="mt-4 space-y-4">
 
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    @click="showModal = false"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end Modal -->
















  
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)


interface ApiResponse {
  Livraison_Adresse: string
  Livraison_Commentaire_: string
  Livraison_ID: number
}

const monTableau = ref<any[]>([])
const isLoading = ref(false)

const OnTourneeInput = async (data: ApiResponse) => {
  try {
    isLoading.value = true
    const usersRequest = await fetch(`http://localhost:3000/Livreur/Objet`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Livraison_ID: data.Livraison_ID,
      }),
    })
    
    if (!usersRequest.ok) {
      throw new Error('Network response was not ok')
    }
    
    const todos = await usersRequest.json()
    monTableau.value = [...todos]
    console.log('monTableau est mis à jour et la modification est envoyée au serveur')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    showModal.value = true
    isLoading.value = false
  }
}

defineProps<{
  data: ApiResponse
}>()
</script>