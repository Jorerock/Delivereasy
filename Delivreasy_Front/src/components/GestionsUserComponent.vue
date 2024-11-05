<script setup lang="ts">
import { ref } from 'vue';
import { Utilisateur } from '../models/Utilisateur';


const props = defineProps<{ user: Utilisateur }>();
const emit = defineEmits(['onInput'])
const onInput = (value: boolean) => {
    console.log('TodoComponent a détecté un changement ', value);
    emit('onInput', { ...props.user, Utilisateur_Admin: value })
}


const newValueEmail = ref(props.user.Utilisateur_Email);
const editModeEmail = ref(false);
const onConfirmTextEmail = () => {
  editModeEmail.value = false;
    emit('onInput', { ...props.user, Utilisateur_Email: newValueEmail.value });
}
const onCancelTextEmail = () => {
  editModeEmail.value = false;
    newValueEmail.value = props.user.Utilisateur_Email;
}

const newValueUtilisateur_Nom= ref(props.user.Utilisateur_Nom);
const editModeUtilisateur_Nom = ref(false);
const onConfirmTextUtilisateur_Nom = () => {
  editModeUtilisateur_Nom.value = false;
    emit('onInput', { ...props.user, Utilisateur_Nom: newValueUtilisateur_Nom.value });
}
const onCancelTextUtilisateur_Nom = () => {
  editModeUtilisateur_Nom.value = false;
    newValueUtilisateur_Nom.value = props.user.Utilisateur_Nom;
}

const newValue= ref(props.user.Utilisateur_Prenom);
const editMode = ref(false);
const onConfirmText= () => {
  editMode.value = false;
    emit('onInput', { ...props.user, Utilisateur_Prenom: newValue.value });
}
const onCancelText= () => {
  editMode.value = false;
    newValue.value = props.user.Utilisateur_Prenom;
}



</script>

<template>

    <tr>
      <td>   
        <span v-if="!editModeEmail">
            <span @click="editModeEmail = !editModeEmail">
                {{ props.user.Utilisateur_Email }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValueEmail" />
            <button @click="onConfirmTextEmail">Confirmer</button>
            <button @click="onCancelTextEmail">Annuler</button>
        </span>
    </td>
    <td>   
        <span v-if="!editModeUtilisateur_Nom">
            <span @click="editModeUtilisateur_Nom = !editModeUtilisateur_Nom">
                {{ props.user.Utilisateur_Nom }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValueUtilisateur_Nom" />
            <button @click="onConfirmTextUtilisateur_Nom">Confirmer</button>
            <button @click="onCancelTextUtilisateur_Nom">Annuler</button>
        </span>
    </td>
    <td>   
        <span v-if="!editMode">
            <span @click="editMode = !editMode">
                {{ props.user.Utilisateur_Prenom }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValue" />
            <button @click="onConfirmText">Confirmer</button>
            <button @click="onCancelText">Annuler</button>
        </span>
    </td>
        <td>
            <input type="checkbox" :checked="props.user.Utilisateur_Admin" @click="(event: any) => onInput(event.target?.checked)" />
        </td>
    </tr>
 
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
