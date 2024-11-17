-<template>
  <div class="table-container">
    <div class="table-actions">
      <button @click="showModal = true">Ajouter</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item[rowKey]">
          <td v-for="header in headers" :key="header">
            <input v-if="item.isEditing" v-model="item[header]" />
            <span v-else>{{ item[header] }}</span>
          </td>
          <td>
            <button @click="startEdit(item)" v-if="!item.isEditing">Edit</button>
            <div v-else>
              <button @click="saveEdit(item)">Save</button>
              <button @click="cancelEdit(item)">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = false">&times;</span>
        <h2>Add New Item</h2>
        <form @submit.prevent="addItem">
          <div v-for="header in headers" :key="header">
            <label :for="header">{{ header }}:</label>
            <input :id="header" v-model="newItem[header]" required />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
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

<style scoped>

.table-container {
  overflow-x: auto;
}

.table-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
