
<template>
    <h2 class="text-lg font-semibold text-gray-900">Gestion des Objets</h2>
    <ReusableTable
      :headers="headers"
      :items="monTableau"
      rowKey="Objet_ID"
      :apiUrl="apiUrl"
      @itemCreated="handleItemCreated"
      @itemUpdated="handleItemUpdated"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ReusableTable from './ReusableTable.vue';
  import { objet } from '../models/objet';
  
  export default defineComponent({
    name: 'ParentComponent',
    components: {
      ReusableTable
    },
    setup() {
      const headers = ref<string[]>([
      'Objet_Desciption',
      'Client_ID_Client',
      'Livraison_ID'
      ]);
      const apiUrl = ref<string>('http://localhost:3000/objet');
      const monTableau = ref<objet[]>([]);
  
      // Fetch initial data
      onMounted(async () => {
        try {
          const usersRequest = await fetch('http://localhost:3000/objet/all', {
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
  
      const handleItemCreated = (newItem: objet): void => {
        monTableau.value.push(newItem);
      };
  
      const handleItemUpdated = (updatedItem: objet): void => {
        const index = monTableau.value.findIndex(
          item => item.Objet_ID === updatedItem.Objet_ID
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