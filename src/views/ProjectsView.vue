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
        <h3>{{ project.projectTitle }}</h3>
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
      <router-link :to="{ name: 'projectdetail', params: { id: project.id } }" class="btn-more">
    <button>View Project</button>
</router-link>
    </div>
  </div>

  
</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref } from 'vue';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const isLoggedIn = ref(false);
const project = ref({});
const selectedCategory = ref('All'); // Initialize with 'All'


// Check if user is logged in//
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
  selectedCategories,
} = useProjects();

//Filter by categories, using a fuction, that takes in a category as a parameter, and sets the selectedCategory.value to the category parameter//
var selector

const changeCategory = (category) => {
  selectedCategory.value = category;
  // Filter Firestore data based on the selected category
  if (category !== 'All') {
    projects.value = projects.value.filter((project) => project.projectCategory === category);
  } else {
    getProjectsData(); // If 'All' is selected, load all projects
  }
  // Filter Firestore data based on selected categories
  projects.value = projects.value.filter((project) =>
    selectedCategories.value.includes('All') || selectedCategories.value.includes(project.projectCategory)
  ); 
};


onMounted(() => {
  getProjectsData();
});
</script>

<style scoped>

</style>
