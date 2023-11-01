<template>
  <div class="lg:px-28 lg:py-5 md:px-24 md:py-4 sm:px-8 sm:py-4">
    <div class="project-view flex grid md:lg:grid-cols-4 sm:grid-cols-1">
      <div class="admin_project_card" v-for="project in newestProjects" :key="project.id">
        <h3>{{ project.projectTitle }}</h3>
        <p>
          <span>Category: </span>{{ project.projectCategory.join(', ') }}
        </p>
        <p>
          <span>Date: </span>{{ project.projectDate }}
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
import { computed, ref, onMounted } from 'vue';
import useProjects from '../modules/useProducts.js';

const { projects, getProjectsData } = useProjects();

// Define a computed property to get the 4 newest projects
const newestProjects = computed(() => {
  const sortedProjects = projects.value.slice().sort((a, b) => new Date(b.projectDate) - new Date(a.projectDate));
  return sortedProjects.slice(0, 4);
});

onMounted(() => {
  getProjectsData();
});
</script>

<style scoped>
/* Your scoped styles if needed */
</style>
