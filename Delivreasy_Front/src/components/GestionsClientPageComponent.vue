<script setup lang="ts">
import { ref, onMounted } from 'vue';
import clientComponent from './GestionsClientComponent.vue';
import { Client } from '../models/client';
import * as cookie from './Cookie';


const client :Client =  {Client_Email:'' ,Client_AdresseFacturation: '', Client_ID_Client:1 ,Client_Nom:'',Client_Prenom:''};

const ClientTableau = ref<any[]>([]);

onMounted(async () => {
  const clientsRequest = await fetch('http://localhost:3000/client/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    }
  });
  const clients = await clientsRequest.json();
  ClientTableau.value = [...clients]
});

// Modif client
const onclientInput = async (newclientValue: Client, index: number) => {
  ClientTableau.value[index] = newclientValue;
  await fetch(`http://localhost:3000/client/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            Client_Email: newclientValue.Client_Email,
            Client_AdresseFacturation: newclientValue.Client_AdresseFacturation,
            Client_ID_Client: newclientValue.Client_ID_Client,
            Client_Nom: newclientValue.Client_Nom,
            Client_Prenom: newclientValue.Client_Prenom,
          }),
  });
  console.log( newclientValue.Client_Email +'a ete mis à jour et la modification est envoyée au serveur');
};

const deleteclient = async (ID: number, index: number) => {
  await fetch(`http://localhost:3000/client`, {
    method: 'DELETE',
    credentials: 'include',
    
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
            Utilisateur_ID: ID,
          }),
  });
  ClientTableau.value.splice(index, 1);
  console.log('client supprimé');
};


// create client
const createclient = async () => {
  await fetch(`http://localhost:3000/client`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Client_Email: client.Client_Email,
            Client_AdresseFacturation: client.Client_AdresseFacturation,
            Client_ID_Client: client.Client_ID_Client,
            Client_Nom: client.Client_Nom,
            Client_Prenom: client.Client_Prenom,
          }),
  });
  console.log( client.Client_Email +'a ete cree');
  
};
</script>

<template>
  <h1>Client :</h1>
  <!-- <table> -->
    <thead>
      <!-- <tr>
        <th scope="col">Utilisateur_Email</th>
        <th scope="col">Utilisateur_Nom</th>
        <th scope="col">Utilisateur_Prenom</th>
        <th scope="col">Utilisateur_Admin</th>

      </tr> -->
    </thead>
    <div class="clients" v-for="(element, index) in ClientTableau" :key="element.List_ID">
    <clientComponent :cli="element" @onInput="onclientInput($event, index)" />

    <!-- <clientComponent :client="element" @onInput="onclientInput($event, index)" /> -->
    <button class="button button1" @click="deleteclient(element.Utilisateur_ID , index)">Supprimer</button>
    </div>
  <!-- </table> -->

  <div class="container">
    <form @submit.prevent="createclient">
      <input v-model="client.Client_Email" type="email" placeholder="Client_Email"  required />
      <input v-model="client.Client_AdresseFacturation" type="text" placeholder="Client_AdresseFacturation" required />
      <input v-model="client.Client_Nom" type="text" placeholder="Client_Nom" required />
      <input v-model="client.Client_Prenom" type="text" placeholder="Client_Prenom" required />
      <button type="submit">Nouveau Client</button>
    </form>
  </div>
</template>
  
<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}


</style>