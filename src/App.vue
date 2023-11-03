<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'

import { auth } from './firebase.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'

import router from './router'

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

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

let logOut = () => {
  signOut(auth)
  .then(() => {
    console.log('User logged out', auth.currentUser)
    router.push('/login')
  })
  .catch((error) => {
    console.log(error)
  })
}

</script>

<template>
  <header>
    <div class="nav-wrapper 2xl:px-32 2xl:py-5 xl:px-32 xl:py-5 lg:px-28 lg:py-5 md:px-24 md:py-4 sm:px-8 sm:py-4">
     
        <nav>

          <!--Regular nav-->
          <div class="nav-sitelinks flex space-x-10 items-center">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
              <RouterLink to="/projects">Projects</RouterLink>
              <RouterLink v-if="isLoggedIn" to="/addprojects">Add projects</RouterLink>
            
              <button class="logOut " @click="logOut" v-if="isLoggedIn">Log Out</button>
          </div>
    
          <!--Hamburger nav!-->
          <div class="flex flex-col">
            <button @click="toggleMenu" class="invisible sm:visible w-auto">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

          <div :class="menuOpen ? 'block' : 'hidden'" class="move flex flex-col flex-start">
            <div class="left flex flex-col">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About me</RouterLink>
            <RouterLink to="/projects">Projects</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/addprojects">Add projects</RouterLink>
          </div>
            <button class="logOut" @click="logOut" v-if="isLoggedIn">Log Out</button>
          </div>
          
          </div>
      </nav>
      
    </div>

    <div class="inset-x-0 bottom-0 border-b-2 border-black w-4/5 mx-auto"></div>
  </header>

  <RouterView />
  <footer>
    <div class="inset-x-0 bottom-0 border-b-2 border-black w-4/5 mx-auto"></div> 

    <div class=" 2xl:px-32 2xl:py-5 xl:px-32 xl:py-5 lg:px-28 lg:py-5 md:px-24 md:py-4 sm:px-8 sm:py-4">
  <div class="flex grid grid-cols-4 sm:grid-cols-1">

    <div class="footer-box1 flex flex-col">
      <span>Anne-Sofie Walz</span>
      <p>Mulrimediadesigner</p>
    </div>

    <div class="footer-box2 flex flex-col">
      <span>Contact me</span>
      <p>Fiewalz@yahoo.dk</p>
      <p>annwal01@easv365.dk</p>
      <p>+45 30742921</p>
    </div>

    <div class="footer-box3 flex flex-col">
      <span>Follow me</span>
      <a href="www.linkedin.com/in/">Linkedin</a>
    </div>

    <div class="footer-box4 flex flex-col">
      <span>Shortcuts</span>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/Projects">Projects</RouterLink>

      <RouterLink v-if="isLoggedOut" to="/login">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z" clip-rule="evenodd" />
        </svg>
      </RouterLink>

      
    </div>

  </div>
</div>

</footer>
</template>

<style scoped>

html { scroll-behavior: smooth;}

header {
  line-height: 1.5;
  max-height: 110vh;
  width: 100%;
}

header .nav-wrapper {
    display: flex;
    flex-wrap: wrap;
    position: sticky;
    width: 100%;
}

nav  {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.nav-sitelinks {
  display: flex;
  font-size: 1rem;
  width: 100%;
}

nav a {
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

nav a:first-of-type{
  padding-left: 0%;
}

.left, .move{
  align-items: flex-start!important; 
  align-content: flex-start !important;
  align-self: flex-start !important;  
  justify-items: start !important; 
  justify-content: start !important; 
}

@media screen and (max-width: 639px) {
  .nav-sitelinks {
    display: none;
  }
}


</style>
