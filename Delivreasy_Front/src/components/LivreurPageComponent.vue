<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LivreurComponent from './LivreurComponent.vue';
import { Livraison } from '../models/livreurGet';
import * as cookie from './Cookie';

// const tournee : Livraison =  {Tournee_ID:1,Utilisateur_ID:1};
const Tableau = ref<any[]>([]);
onMounted(async () => {
  const livraisonsRequest = await fetch('http://localhost:3000/Livreur', {
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
  Tableau.value = [...livraisons]
});

// Modif livraison
const onlivraisonInput = async (newtourneeValue: Livraison, index: number) => {
  Tableau.value[index] = newtourneeValue;
  await fetch(`http://localhost:3000/tournee/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Tournee_ID: newtourneeValue.Objet_Desciption,
      Utilisateur_ID: newtourneeValue.Objet_Desciption,
    }),
  });
  console.log( newtourneeValue.Objet_Desciption +'a ete mis à jour et la modification est envoyée au serveur');
};

// const deletelivraison = async (ID: number, index: number) => {
//   await fetch(`http://localhost:3000/tournee`, {
//     method: 'DELETE',
//     credentials: 'include',
    
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//             Utilisateur_ID: ID,
//           }),
//   });
//   Tableau.value.splice(index, 1);
//   console.log('tournee supprimé');
// };

// // ceate  livraison
// const createlivraison = async () => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       Tournee_ID: tournee.Tournee_ID,
//       Utilisateur_ID: tournee.Utilisateur_ID,
//     }),
//   };
//   const response = await fetch(`http://localhost:3000/tournee`, requestOptions);
//   if (!response.ok) {
//     console.error(response.status);
//     console.log('Erreur creation pour cause de '+ response.status);
//   } else {
//     Tableau.value.push( await response.json());
//     console.log('tournee Ajoute');
//   }
// };
</script>

<template>
  <h1>Mes Livraisons :</h1>
  <!-- <table> -->
    <thead>
      <!-- <tr>
        <th scope="col">Utilisateur_Email</th>
        <th scope="col">Utilisateur_Nom</th>
        <th scope="col">Utilisateur_Prenom</th>
        <th scope="col">Utilisateur_Admin</th>

      </tr> -->
    </thead>
    <div class="livraisons" v-for="(element, index) in Tableau" :key="element.List_ID">
    <LivreurComponent :cli="element" @onInput="onlivraisonInput($event, index)" />

    <!-- <livraisonComponent :livraison="element" @onInput="onlivraisonInput($event, index)" /> -->
    <!-- <button class="button button1" @click="deletelivraison(element.Utilisateur_ID , index)">Supprimer</button> -->
    </div>
  <!-- </table> -->
<!-- 
  <div class="container">
    <form @submit.prevent="createlivraison">
      <input v-model="tournee.Tournee_ID" type="text" placeholder="Livraison_Adresse"  required />
      <input v-model="tournee.Utilisateur_ID" type="text" placeholder="Tournee_ID" required />
      <button type="submit">Nouvelle tournee</button>
    </form>
  </div> -->
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