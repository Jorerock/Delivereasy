
<template>
    <h2 class="text-lg font-semibold text-gray-900">Gestion des Objets</h2>
    <ReusableTable
      :headers="headers"
      :items="monTableau"
      rowKey="Tournee_ID"
      :apiUrl="apiUrl"
      @itemCreated="handleItemCreated"
      @itemUpdated="handleItemUpdated"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ReusableTable from './ReusableTable.vue';
  import { Tournee } from '../models/tournee';
  
  export default defineComponent({
    name: 'ParentComponent',
    components: {
      ReusableTable
    },
    setup() {
      const headers = ref<string[]>([
        'Tournee_ID',
        'Tournee_Jour',
        'Utilisateur_ID'
      ]);
      const apiUrl = ref<string>('http://localhost:3000/tournee');
      const monTableau = ref<Tournee[]>([]);
  
      // Fetch initial data
      onMounted(async () => {
        try {
          const usersRequest = await fetch('http://localhost:3000/tournee/all', {
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
  
      const handleItemCreated = (newItem: Tournee): void => {
        monTableau.value.push(newItem);
      };
  
      const handleItemUpdated = (updatedItem: Tournee): void => {
        const index = monTableau.value.findIndex(
          item => item.Tournee_ID === updatedItem.Tournee_ID
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