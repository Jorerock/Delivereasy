<template>
  <div class="table-container">
    <div class="table-actions">
      <button @click="showModal = true">Add New</button>
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

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
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
  data() {
    return {
      showModal: false,
      newItem: {},
      editingItem: null
    }
  },
  methods: {
    startEdit(item) {
      this.$set(item, 'isEditing', true)
      this.editingItem = { ...item }
    },

    saveEdit(item) {
      this.$set(item, 'isEditing', false)
      this.updateItem(item)
    },

    cancelEdit(item) {
      this.$set(item, 'isEditing', false)
      Object.assign(item, this.editingItem)
      this.editingItem = null
    },

    addItem() {
      this.createItem(this.newItem)
      this.showModal = false
      this.newItem = {}
    },

    createItem(item) {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(data => {
          this.$emit('itemCreated', data)
        })
        .catch(error => {
          console.error('Error creating item:', error)
        })
    },

    updateItem(item) {
      fetch(`${this.apiUrl}/${item[this.rowKey]}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(data => {
          this.$emit('itemUpdated', data)
        })
        .catch(error => {
          console.error('Error updating item:', error)
        })
    }
  }
}
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