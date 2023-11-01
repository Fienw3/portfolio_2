<template>

<div class="lg:px-28 lg:py-5 md:px-24 md:py-4 sm:px-8 sm:py-4">

<div class="category-boxes">
  <button type="button" class="web-btn" @click="changeCategory('Web')" value="Web">Web</button>
  <button type="button" class="video-btn" @click="changeCategory('Video')" value="Video">Video</button>
  <button type="button" class="photo-btn" @click="changeCategory('Photo')" value="Photos">Photos</button>
  <button type="button" class="design-btn" @click="changeCategory('Design')" value="Design">Design</button>
  <button type="button" class="ui/ux-btn" @click="changeCategory('UX/UI')" value="UX/UI">UI/UX</button>
  <button type="button" class="all" @click="changeCategory('All')">All</button>
</div>

  <div class="project-view flex grid md:lg:grid-cols-4 sm:grid-cols-1">
    <div class="admin_project_card" v-for="project in filteredProjects" :key="project.id">
      
        <h3>{{ project.projectTitle }}</h3>

        <div class="flex items-center justify-center w-80 h-80" v-if="project.projectImg">
          <img id="projectImage" :src="project.projectImg" alt="Project Image" class="w-20 h-20">
      </div>


      <p>
        <span>Category: </span>{{ project.projectCategory.join(', ') }}
      </p>
      <p>
        <span>Date: </span>{{ project.projectDate}}
      </p>
      <p>
        <span>Team: </span>{{ project.projectTeam }}
      </p>
      <p>
        <span>Description: </span>{{ project.projectDescription }}
      </p>

      <router-link :to="{ name: 'projectdetail', params: { id: project.id } }" class="btn-more">
    <button>View Project</button>
</router-link>
    </div>
    </div>
  </div>

</template>

<script setup>
import useProjects from '../modules/useProducts.js';
import { onMounted, ref, computed } from 'vue';

import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const isLoggedIn = ref(false);
const project = ref({});

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

const { projects, getProjectsData } = useProjects();
const selectedCategory = ref('All');

// Define a computed property to filter projects based on the selected category
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value;
  } else {
    return projects.value.filter((project) => project.projectCategory.includes(selectedCategory.value));
  }
});

// A function to change the selected category
const changeCategory = (category) => {
  selectedCategory.value = category;
};


onMounted(() => {
  getProjectsData();
});
</script>

<style scoped>


</style>
