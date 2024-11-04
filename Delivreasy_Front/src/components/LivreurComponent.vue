<script setup lang="ts">
import { ref } from 'vue';
import { Livraison } from '../models/livreurGet';


const props = defineProps<{ cli: Livraison }>();
const editMode = ref(false);
const newValue = ref(props.cli.Livraison_Commentaire_);
const emit = defineEmits(['onInput'])
const onInput = (value: boolean) => {
    console.log('TodoComponent a détecté un changement ', value);
    emit('onInput', { ...props.cli, Livraison_Commentaire_: value })
}
const onConfirmText = () => {
    editMode.value = false;
    emit('onInput', { ...props.cli, Livraison_Commentaire_: newValue.value });
}
const onCancelText = () => {
    editMode.value = false;
    newValue.value = props.cli.Livraison_Commentaire_;
}
</script>

<template>
  <tbody>
    <tr>
        <td>{{ props.cli.Objet_Desciption }}</td>
        <td>{{ props.cli.Livraison_Adresse }}</td>
        <td>{{ props.cli.Livraison_Etape }}</td>
        <td>
        <span v-if="!editMode">
            <span @click="editMode = !editMode">
                {{ props.cli.Livraison_Commentaire_ }}    
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValue" />
            <button @click="onConfirmText">Confirmer</button>
            <button @click="onCancelText">Annuler</button>
        </span>
        </td>
        <td>{{ props.cli.Livraison_Arrive }}</td>    
        <td>{{ props.cli.Tournee_Jour }} </td>
    </tr>
  </tbody>
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
