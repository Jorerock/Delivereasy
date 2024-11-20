
<template>
  <ReusableTable
    :headers="headers"
    :items="monTableau"
    rowKey="Client_ID_Client"
    :apiUrl="apiUrl"
    @itemCreated="handleItemCreated"
    @itemUpdated="handleItemUpdated"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ReusableTable from './ReusableTable.vue';
import { Client } from '../models/client';

export default defineComponent({
  name: 'ParentComponent',
  components: {
    ReusableTable
  },
  setup() {
    const headers = ref<string[]>([
    'Client_Email',
    'Client_AdresseFacturation',
    'Client_Nom' , 
    'Client_Prenom'  
    ]);
    const apiUrl = ref<string>('http://localhost:3000/client');
    const monTableau = ref<Client[]>([]);

    // Fetch initial data
    onMounted(async () => {
      try {
        const usersRequest = await fetch('http://localhost:3000/client/all', {
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


    const handleItemCreated = (newItem: Client): void => {
      monTableau.value.push(newItem);
    };

    const handleItemUpdated = (updatedItem: Client): void => {
      const index = monTableau.value.findIndex(
        item => item.Client_ID_Client === updatedItem.Client_ID_Client
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