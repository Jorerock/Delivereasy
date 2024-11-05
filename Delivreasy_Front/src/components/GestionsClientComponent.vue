<script setup lang="ts">
import { ref } from 'vue';
import { Client } from '../models/client';


const props = defineProps<{ cli: Client }>();

const emit = defineEmits(['onInput'])
const onInput = (value: boolean) => {
    console.log('TodoComponent a détecté un changement ', value);
    emit('onInput', { ...props.cli, Todo_end: value })
}




const editModeClient_Email = ref(false);
const newValueClient_Email = ref(props.cli.Client_Email);
const onConfirmTextClient_Email = () => {
    editModeClient_Email.value = false;
    emit('onInput', { ...props.cli, Todo_name: newValueClient_Email.value });
}
const onCancelTextClient_Email = () => {
    editModeClient_Email.value = false;
    newValueClient_Email.value = props.cli.Client_Email;
}



const editModeClient_AdresseFacturation = ref(false);
const newValueClient_AdresseFacturation = ref(props.cli.Client_AdresseFacturation);
const onConfirmTextClient_AdresseFacturation = () => {
  editModeClient_AdresseFacturation.value = false;
    emit('onInput', { ...props.cli, Todo_name: newValueClient_AdresseFacturation.value });
}
const onCancelTextClient_AdresseFacturation = () => {
  editModeClient_AdresseFacturation.value = false;
    newValueClient_AdresseFacturation.value = props.cli.Client_Email;
}
</script>

<template>

  <tbody>
    <tr>
      <td>   
        <span v-if="!editModeClient_Email">
            <span @click="editModeClient_Email = !editModeClient_Email">
                {{ props.cli.Client_Email }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValueClient_Email" />
            <button @click="onConfirmTextClient_Email">Confirmer</button>
            <button @click="onCancelTextClient_Email">Annuler</button>
        </span>
    </td>
    <td>   
        <span v-if="!editModeClient_AdresseFacturation">
            <span @click="editModeClient_AdresseFacturation = !editModeClient_AdresseFacturation">
                {{ props.cli.Client_AdresseFacturation }} 
            </span>
        </span>
        <span v-else>
            <!-- mode edition -->
            <input type="text" v-model="newValueClient_AdresseFacturation" />
            <button @click="onConfirmTextClient_AdresseFacturation">Confirmer</button>
            <button @click="onCancelTextClient_AdresseFacturation">Annuler</button>
        </span>
    </td>




    
        <!-- <td>
            <input type="checkbox" :checked="props.cli.Client_Admin" @click="(event: any) => onInput(event.target?.checked)" />
        </td> -->
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
