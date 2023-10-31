<template>
  <div class="add-project">

    <div>
      <h2>Tilføj Projekt</h2>

        <input type="text" placeholder="Project name" v-model="AddProjectData.projectTitle" >

        <div>
          <input type="checkbox" id="UX/UI" value="UX/UI" v-model="AddProjectData.projectCategory">
          <label for="UX/UI">UX/UI</label>
          <input type="checkbox" id="Web" value="Web" v-model="AddProjectData.projectCategory">
          <label for="Web">Web</label>
          <input type="checkbox" id="Video" value="Video" v-model="AddProjectData.projectCategory">
          <label for="Video">Video</label>
          <input type="checkbox" id="Photo" value="Photo" v-model="AddProjectData.projectCategory">
          <label for="Photo">Photo</label>
          <input type="checkbox" id="Design" value="Design" v-model="AddProjectData.projectCategory">
          <label for="Design">Design</label>
        </div>

        <input type="date" placeholder="Project date" v-model="AddProjectData.projectDate" >
        <input type="text" placeholder="Project description" v-model="AddProjectData.projectDescription" >
        <input type="text" placeholder="Project team" v-model="AddProjectData.projectTeam" >
        <input type="text" placeholder="Project tech" v-model="AddProjectData.projectTech" >
        <input type="text" placeholder="Project status" v-model="AddProjectData.projectStatus" >
        <input type="text" placeholder="Project link" v-model="AddProjectData.projectLink" >
        <input type="text" placeholder="Project Process" v-model="AddProjectData.projectProcess" >
        
        <button class="btn-add" @click="firebaseAddSingleItem()">Add Item</button>

    </div>
  </div>
</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue'

import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

let isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log('User logged in', auth.currentUser)

    } else {
      isLoggedIn.value = false
      console.log('User logged out', auth.currentUser)

    }
  })
})


const { 
  getProjectsData, 
  firebaseAddSingleItem ,
  AddProjectData,

} = useProjects();

onMounted(() => {
  getProjectsData();
})


</script>

<style>
@media (min-width: 1024px) {
  .add-project {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
