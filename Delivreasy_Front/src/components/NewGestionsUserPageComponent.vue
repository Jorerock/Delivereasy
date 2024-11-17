
<template>
  <ReusableTable
    :headers="headers"
    :items="monTableau"
    rowKey="Utilisateur_ID"
    :apiUrl="apiUrl"
    @itemCreated="handleItemCreated"
    @itemUpdated="handleItemUpdated"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ReusableTable from './ReusableTable.vue';
import { Utilisateur } from '../models/Utilisateur';

export default defineComponent({
  name: 'ParentComponent',
  components: {
    ReusableTable
  },
  setup() {
    const headers = ref<string[]>([
      'Utilisateur_Email',
      'Utilisateur_Nom',
      'Utilisateur_Prenom',
      'Utilisateur_Admin',
      'Utilisateur_Password'
    ]);
    const apiUrl = ref<string>('http://localhost:3000/admin/users');
    const monTableau = ref<Utilisateur[]>([]);

    // Fetch initial data
    onMounted(async () => {
      try {
        const usersRequest = await fetch('http://localhost:3000/admin/users/all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            'Content-Type': 'application/json',
          }
        });
        
        if (!usersRequest.ok) {
          throw new Error(`HTTP error! status: ${usersRequest.status}`);
        }
        
        const users = await usersRequest.json();
        monTableau.value = [...users];
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });

    const handleItemCreated = (newItem: Utilisateur): void => {
      monTableau.value.push(newItem);
    };

    const handleItemUpdated = (updatedItem: Utilisateur): void => {
      const index = monTableau.value.findIndex(
        item => item.Utilisateur_ID === updatedItem.Utilisateur_ID
      );
      if (index !== -1) {
        monTableau.value.splice(index, 1, updatedItem);
      }
    };

    return {
      headers,
      monTableau,
      apiUrl,
      handleItemCreated,
      handleItemUpdated
    };
  }
});
</script>