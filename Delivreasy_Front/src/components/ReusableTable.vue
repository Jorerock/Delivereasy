
<template>
  <div class="space-y-4">
    <!-- Table Actions -->
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-900"></h2>
      <button
        @click="showModal = true"

        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Ajouter
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in items" :key="item[rowKey]">
            <td
              v-for="header in headers"
              :key="header"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <input
                v-if="item.isEditing"
                v-model="item[header]"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <span v-else>{{ item[header] }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div v-if="!item.isEditing">
                <button
                  @click="startEdit(item)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Modifier
                </button>
              </div>
              <div v-else class="space-x-2">
                <button
                  @click="saveEdit(item)"
                  class="text-green-600 hover:text-green-900 font-medium"
                >
                  Enregistrer
                </button>
                <button
                  @click="cancelEdit(item)"
                  class="text-red-600 hover:text-red-900 font-medium"
                >
                  Annuler
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>


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
              <form @submit.prevent="addItem" class="mt-4 space-y-4">
                <div v-for="header in headers" :key="header" class="grid grid-cols-1 gap-y-2">
                  <label :for="header" class="block text-sm font-medium text-gray-700">
                    {{ header }}:
                  </label>
                  <input
                    :id="header"
                    v-model="newItem[header]"
                    required
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import { TableItem } from '../models/tables'

export default defineComponent({
  name: 'ReusableTable',
  props: {
    headers: {
      type: Array as PropType<string[]>,
      required: true
    },
    items: {
      type: Array as PropType<TableItem[]>,
      required: true
    },
    rowKey: {
      type: String,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    }
  },
  emits: ['itemCreated', 'itemUpdated'],
  setup(props, { emit }) {
    const showModal = ref(false)
    const newItem = reactive({} as TableItem)
    const editingItem = ref<TableItem | null>(null)

    const startEdit = (item: TableItem): void => {
      item.isEditing = true
      editingItem.value = { ...item }
    }

    const saveEdit = (item: TableItem): void => {
      item.isEditing = false
      updateItem(item)
    }

    const cancelEdit = (item: TableItem): void => {
      item.isEditing = false
      if (editingItem.value) {
        Object.assign(item, editingItem.value)
      }
      editingItem.value = null
    }

    const addItem = (): void => {
      createItem(newItem)
      showModal.value = false
      Object.keys(newItem).forEach(key => {
        delete newItem[key]
      })
    }

    const createItem = async (item: TableItem): Promise<void> => {
      try {
        const response = await fetch(props.apiUrl, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
        const data = await response.json()
        emit('itemCreated', data)
      } catch (error) {
        console.error('Error creating item:', error)
      }
    }

    const updateItem = async (item: TableItem): Promise<void> => {
      try {
        const response = await fetch(`${props.apiUrl}/`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
        const data = await response.json()
        emit('itemUpdated', data)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }

    return {
      showModal,
      newItem,
      editingItem,
      startEdit,
      saveEdit,
      cancelEdit,
      addItem,
      createItem,
      updateItem
    }
  }
})
</script>