<template>
  <div class="2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">

    <div class="home-container1 flex grid grid-cols-2 sm:grid-cols-1 gap-5">
        <div class="home-about">
    
            <h1>Hi! My name is  Anne-Sofie, <br>
            and welcome to my creative universe.</h1>
            <p class="about-home">‘Out of the box’ thinking multimedia design student, with a passion for content creation and front-end development.
              <br>
              <br>
            I am passionate about the creative process from idea to the finished product, with a detail oriented and striving personality I strive for a good final product. I am always curious about the world around me. <br>

            In the future i want to work in one of these areas, an forever better my skills: ux/ui design, grafic design and web development.</p>


          <div class="aboutme-box">
            <button><RouterLink class="aboutme-btn" to="/about">Read more about me here!</RouterLink></button><br>
              <button class="font-bold align-middle" href="https://erhvervsakademisydvest-my.sharepoint.com/:b:/g/personal/annwal01_easv365_dk/EfZ_OPx6-nRKj2Pb8urT1pUB2qOY4BEHzbunuUZcTpbZ1A?e=Fyfw4I" alt="button that links to cv on onedrive">Download CV</button>
        </div>
    </div>

    <div class="about-photo flex justify-end md:justify-center">
      <img class="portrait" src="../assets/Minime.png" alt="Illustration of Anne-Sofie">

    </div> 

</div>




    <h2 class="text-center">Newest Projects</h2>

    <div class="project-view flex grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">

      <div class="admin_project_card" v-for="project in newestProjects" :key="project.id">
        <h3>{{ project.projectTitle }}</h3>

        <div class="flex items-center justify-center" v-if="project.projectImg">
          <div class="square-image">
            <img :src="project.projectImg" alt="Project Image">
          </div>
        </div>

        <p>
          <span>Category: </span>{{ project.projectCategory.join(', ') }}
        </p>
        <p>
          <span>Date: </span>{{ project.projectDate }}
        </p>
        <p>
          <span>Description: </span>{{ project.projectDescription }}
        </p>
        <div class="flex justify-center py-1">
          <router-link :to="{ name: 'projectdetail', params: { id: project.id } }" class="btn-more">
            <button>View Project</button>
          </router-link>
      </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import useProjects from '../modules/useProducts.js';

const { projects, getProjectsData } = useProjects();

// Define a computed property to get the 4 newest projects, based on thee date thats inserted into the input field.
const newestProjects = computed(() => {
  const sortedProjects = projects.value.slice().sort((a, b) => new Date(b.projectDate) - new Date(a.projectDate));
  return sortedProjects.slice(0, 4);
});

onMounted(() => {
  getProjectsData();
});
</script>

<style scoped>
.portrait {
max-width: auto;
height: 75%;
}

</style>
