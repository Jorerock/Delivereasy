<template>
    <div class="w-full p-4">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Card header -->
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Detaille de la Livraison</h3>
        </div>
  
        <!-- Mobile view (card layout) -->
        <div class="block sm:hidden">
          <div
            class="w-full p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-500 uppercase">Objet_Desciption	</label>
                <p class="mt-1 text-sm text-gray-900">{{ data.Objet_Desciption }}</p>
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
          </div>
        </div>
  
        <!-- Desktop view (table layout) -->
        <div class="hidden sm:block">
          <div
            class="w-full"
          >
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Objet_Desciption
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commentaire
                    </th>
                    <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th> -->
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      {{ data.Objet_Desciption }}
                    </td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      {{ data.Livraison_Commentaire_ }}
                    </td>
                    <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ data.Livraison_ID }}
                    </td> -->
                  </tr>
                </tbody>
              </table>

            </div>
        </div>
        </div>
      </div>
    </div>

  
  
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ResultComponent from './ResultComponent.vue'
  

  
  interface ApiResponse {
    Livraison_Adresse: string
    Livraison_Commentaire_: string
    Livraison_ID: number
    Livraison_Arrive : number
  }
  
  
  defineProps<{
    data: any
  }>()
  </script>