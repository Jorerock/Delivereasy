<script setup lang="ts">
import { ref, onMounted } from 'vue';
import livraisonComponent from './GestionsLivraisonComponent.vue';
import { Livraison } from '../models/livraison';
import * as cookie from './Cookie';


const livraison : Livraison =  {Livraison_Adresse:'' ,Livraison_Arrive: false, Livraison_ID:1 ,Livraison_Commentaire_:'',Livraison_Etape:0,Livraison_Signature:0,Tournee_ID:1};

const livraisonTableau = ref<any[]>([]);

onMounted(async () => {
  const livraisonsRequest = await fetch('http://localhost:3000/livraisons/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      'Content-Type': 'application/json',
    }
  });
  const livraisons = await livraisonsRequest.json();
  livraisonTableau.value = [...livraisons]
});

// Modif livraison
const onlivraisonInput = async (newlivraisonValue: Livraison, index: number) => {
  livraisonTableau.value[index] = newlivraisonValue;
  await fetch(`http://localhost:3000/livraison/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
          Livraison_Adresse: newlivraisonValue.Livraison_Adresse,
          Livraison_Arrive: newlivraisonValue.Livraison_Arrive,
          Livraison_ID: newlivraisonValue.Livraison_ID,
          Livraison_Commentaire_: newlivraisonValue.Livraison_Commentaire_,
          Livraison_Etape: newlivraisonValue.Livraison_Etape,
          Livraison_Signature : newlivraisonValue.Livraison_Signature
          }),

  });
  console.log( newlivraisonValue.Livraison_ID +'a ete mis à jour et la modification est envoyée au serveur');
};

const deletelivraison = async (ID: number, index: number) => {
  await fetch(`http://localhost:3000/livraison`, {
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
  livraisonTableau.value.splice(index, 1);
  console.log('livraison supprimé');
};

// ceate  livraison
const createlivraison = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Livraison_Adresse: livraison.Livraison_Adresse,
          Livraison_Arrive: livraison.Livraison_Arrive,
          Livraison_ID: livraison.Livraison_ID,
          Livraison_Commentaire_: livraison.Livraison_Commentaire_,
          Livraison_Etape: livraison.Livraison_Etape,
          Livraison_Signature : livraison.Livraison_Signature
          }),
  };
  const response = await fetch(`http://localhost:3000/livraison`, requestOptions);
  if (!response.ok) {
    console.error(response.status);
    console.log('Erreur creation pour cause de '+ response.status);
  } else {
    livraisonTableau.value.push( await response.json());
    console.log('livraison Ajoute');
  }
};
</script>

<template>
  <h1>Gestions Livraison :</h1>
  <!-- <table> -->
    <thead>
      <!-- <tr>
        <th scope="col">Utilisateur_Email</th>
        <th scope="col">Utilisateur_Nom</th>
        <th scope="col">Utilisateur_Prenom</th>
        <th scope="col">Utilisateur_Admin</th>

      </tr> -->
    </thead>
    <div class="livraisons" v-for="(element, index) in livraisonTableau" :key="element.List_ID">
    <livraisonComponent :cli="element" @onInput="onlivraisonInput($event, index)" />

    <!-- <livraisonComponent :livraison="element" @onInput="onlivraisonInput($event, index)" /> -->
    <button class="button button1" @click="deletelivraison(element.Utilisateur_ID , index)">Supprimer</button>
    </div>
  <!-- </table> -->

  <div class="container">
    <form @submit.prevent="createlivraison">
      <input v-model="livraison.Livraison_Adresse" type="text" placeholder="Livraison_Adresse"  required />
      <input v-model="livraison.Tournee_ID" type="text" placeholder="Tournee_ID" required />
      <button type="submit">Nouveau livraison</button>
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