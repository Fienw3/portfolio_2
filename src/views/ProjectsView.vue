<template>

<div class="category-boxes sm:flex-wrap md:flex-wrap">
  <button type="button" class="web-btn" @click="changeCategory('Web')" value="Web">Web</button>
  <button type="button" class="video-btn" @click="changeCategory('Video')" value="Video">Video</button>
  <button type="button" class="photo-btn" @click="changeCategory('Photo')" value="Photos">Photos</button>
  <button type="button" class="design-btn" @click="changeCategory('Design')" value="Design">Design</button>
  <button type="button" class="ui/ux-btn" @click="changeCategory('UX-UI')" value="UX-UI">UI/UX</button>
  <button type="button" class="all" @click="changeCategory('All')">All</button>
</div>

  <div class="project-view">
    <div class="admin_project_card" v-for="project in projects" :key="project.projectID">
        <h4>{{ project.projectTitle }}</h4>
      <p>
        Category: {{ project.projectCategory }}
      </p>
      <p>
        Date: {{ project.projectDate}}
      </p>
      <p>
        Description: {{ project.projectDescription }}
      </p>
      <p>
        Team: {{ project.projectTeam }}
      </p>
      <p>
        Tech: {{ project.projectTech }}
      </p>
      <p>
        Status: {{ project.projectStatus }}
      </p>
      <p>
        Link: {{ project.projectLink }}
      </p>
      <p>
        Process: {{ project.projectProcess }}
      </p>
      <!-- <router-link :to="{ name: 'ProjectDetailView', params: { id: project.projectID } }" class="btn-more"> -->
        <!-- View Project -->
      <!-- </router-link> -->
      <button class="btn-delete" @click="firebaseDeleteSingleItem(project.id)" v-if="isLoggedIn">Delete item</button>
      <button class="btn-edit" @click="openEditModal(project)" v-if="isLoggedIn">Edit item</button>
    </div>
  </div>

  <div class="modal" v-if="isEditModalOpen">
    <div class="modal-content">
      
        <p> New Project Title:
        <input type="text" placeholder="New project title" v-model="project.projectTitle" />
        </p>
        <p> New Project Category:
        <input type="text" placeholder="New project category" v-model="project.projectCategory" />
       </p>
        <p> New Project Date:
          <input type="date" placeholder="New project date" v-model="project.projectDate" />
        </p>
        <p> New Project Description:
          <input type="text" placeholder="New project description" v-model="project.projectDescription" />
        </p>
        <p> New Project Team:
          <input type="text" placeholder="New project team" v-model="project.projectTeam" />
        </p>
        <p> New Project Tech:
          <input type="text" placeholder="New project tech" v-model="project.projectTech" />
        </p>
        <p> New Project Status:
          <input type="text" placeholder="New project status" v-model="project.projectStatus" />
        </p>
        <p> New Project Link:
          <input type="text" placeholder="New project link" v-model="project.projectLink" />
        </p>
        <p> New Project Process:
          <input type="text" placeholder="New project process" v-model="project.projectProcess" />
        </p>
      
        <button class="btn-update" @click="firebaseUpdateSingleItem(project.id)" v-if="isLoggedIn">Update Item</button>
        <button class="btn-close" @click="closeEditModal">Close</button>
      <hr>
    </div>
  </div>
</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const isLoggedIn = ref(false);
const isEditModalOpen = ref(false);
const project = ref({});


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      console.log('User logged in', auth.currentUser);
    } else {
      isLoggedIn.value = false;
      console.log('User logged out', auth.currentUser);
    }
  });
});

const {
  projects,
  getProjectsData,
  firebaseDeleteSingleItem,
  firebaseUpdateSingleItem,
} = useProjects();

const openEditModal = (selectedProject) => {
  project.value = { ...selectedProject };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

onMounted(() => {
  getProjectsData();
});
</script>

<style scoped>
/* Add your modal styles here */
.modal {
  /* Style your modal here */
}
.modal-content {
  /* Style your modal content here */
}
</style>
