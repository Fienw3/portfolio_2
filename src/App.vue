<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'

import { auth } from './firebase.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'

import router from './router'

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

        <div class="nav-sitelinks lg:w-2/5 md:w-2/5 sm:w-3-5 sm:text-xs">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/projects">Projects</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/addprojects">Add projects</RouterLink>
          
              <button class="logOut " @click="logOut" v-if="isLoggedIn">Log Out</button>
        </div>
        

      </nav>
      
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

/* BD Supper adobe-font import */
@import url("https://use.typekit.net/vyo8bsa.css");

html { scroll-behavior: smooth;}

header {
  line-height: 1.5;
  max-height: 110vh;
  width: 100%;
  background-color: #F2f2f2;
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
  padding: 0 1rem;
  align-self: center;
  color: black;
  display: flex;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

nav a:first-of-type{
  padding-left: 0%;
}


</style>
