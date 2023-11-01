<template>
  
  <div class="add-project flex 2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">
    <div class="flex flex-col">

      <h1 class="">Tilføj Projekt</h1>

      <div class="add-project-box grid md:lg:grid-cols-2 sm:grid-cols-1 gap-4">

        <div class="add1 flex flex-col space-y-2">
          <div>
            <label for="projectTitle">Title:</label>
            <input type="text" id="projectTitle" placeholder="Project name" v-model="AddProjectData.projectTitle" class="border p-2 rounded-md w-full">
          </div>
            <p>Category:</p>
            <div class="flex flex-wrap">
            <div class="md:lg:space-x-2">
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
          </div>
          <div>
            <label for="projectDate">Date:</label>
            <input type="date" id="projectDate" v-model="AddProjectData.projectDate" class="border p-2 rounded-md w-full">
          </div>
          <div>
            <label for="projectDescription">Description:</label>
            <input type="text" id="projectDescription" placeholder="Project description" v-model="AddProjectData.projectDescription" class="border p-2 rounded-md w-full">
          </div>
        </div>

        <div class="add2 flex flex-col space-y-2">
          <div>
            <label for="projectTeam">Team:</label>
            <input type="text" id="projectTeam" placeholder="Project team" v-model="AddProjectData.projectTeam" class="border p-2 rounded-md w-full">
          </div>
          <div>
            <label for="projectTech">Tech:</label>
            <input type="text" id="projectTech" placeholder="Project tech" v-model="AddProjectData.projectTech" class="border p-2 rounded-md w-full">
          </div>
          <div>
            <label for="projectStatus">Status:</label>
            <input type="text" id="projectStatus" placeholder="Project status" v-model="AddProjectData.projectStatus" class="border p-2 rounded-md w-full">
          </div>
          <div>
            <label for="projectLink">Link:</label>
            <input type="text" id="projectLink" placeholder="Project link" v-model="AddProjectData.projectLink" class="border p-2 rounded-md w-full">
          </div>
        </div>
      </div>
      
      <div>
        <input id="projectImg" type="file" @change="uploadImg" accept="image/*">
      </div>

      <div class="mb-4">
        <label for="projectProcess">Process:</label>
        <textarea id="projectProcess" placeholder="Project process" v-model="AddProjectData.projectProcess" class="border p-2 rounded-md w-full"></textarea>
      </div>

      <button @click="firebaseAddSingleItem()">Add Item</button>
    </div>
  </div>
</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue'

import { auth } from '../firebase.js'

//const { uploadImg } = useProjects();

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

// const uploadImage = (event) => {
//   uploadImg(event);
// }

const { 
  getProjectsData, 
  firebaseAddSingleItem ,
  AddProjectData,
  uploadImg

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
