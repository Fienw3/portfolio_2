<template>

<div class="2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">

  <h1 class="text-center">Projects</h1>

<!--Category filter-->
<div class="category-boxes grid grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-4">
  <button type="button" class="web-btn" @click="changeCategory('Web')" value="Web">Web</button>
  <button type="button" class="video-btn" @click="changeCategory('Video')" value="Video">Video</button>
  <button type="button" class="photo-btn" @click="changeCategory('Photo')" value="Photos">Photos</button>
  <button type="button" class="design-btn" @click="changeCategory('Design')" value="Design">Design</button>
  <button type="button" class="ui/ux-btn" @click="changeCategory('UX/UI')" value="UX/UI">UI/UX</button>
  <button type="button" class="all" @click="changeCategory('All')">All</button>
</div>

  <div class="project-view flex grid grid-cols-4 sm:grid-cols-1">
    <div class="admin_project_card" v-for="project in filteredProjects" :key="project.id">
      
        <h3>{{ project.projectTitle }}</h3>

        <div class="flex items-center justify-center" v-if="project.projectImg">
          <div class="square-image">
            <img :src="project.projectImg" alt="Project Image">
          </div>
        </div>

        <div class="flex flex-col">
        <p>
          <span>Category: </span>{{ project.projectCategory.join(', ') }}
        </p>
        <p>
          <span>Date: </span>{{ project.projectDate }}
        </p>
        <p>
          <span>Description: </span>{{ project.projectDescription }}
        </p>

        <!--Button to go to the projectdetailview, with data thats consistent with the id-->
        <div class="flex flex-col items-center justify-end h-full">
          <router-link :to="{ name: 'projectdetail', params: { id: project.id } }" class="btn-more">
            <button>View Project</button>
          </router-link>
      </div>
    </div>
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

// Define a computed property (deprive value based on existing data) to filter projects based on the selected category
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
