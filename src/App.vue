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
            <RouterLink to="/projects">Projects</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/addprojects">Add projects</RouterLink>
          
              <button @click="logOut" v-if="isLoggedIn">Log Out</button>
        </div>
        
      <div class="blankspace lg:w-1/5 md:w-1/5 sm:text-xs md:text-xs sm:hidden md:hidden align-middle"></div>
        
      <div class="contact-box lg:w-2/5 sm:w-2/5 md:hidden sm:hidden">
          <a class="linkedinicon md:invisible sm:hidden" href="https://www.linkedin.com/in/anne-sofienwalz"><img src="../src/assets/Linkedin.png" alt="LinkedIn icon that takes you to my profile"></a>
        
          <div id="contact" class="contact sm:hidden">
            <form method="get" action="#footer">
                <button class="contact-btn sm:text-xs md:text-xs">Contact me</button>
            </form>
          </div>
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
  /* border-bottom: 2px solid #000000; */
  /* box-shadow: 0px 0px 3px 0px; */
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
}

nav a.router-link-exact-active {
  color: var(--pink-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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

.logo-name {
  align-self: center;
}

nav a img {
  max-height: 2rem;
  align-self: center;
}

nav a img:hover {
  transform: scale(1.1);
}

.contact-box {
  display: flex;
  justify-content: right;
  align-items: center;
}

img {
margin:0%;
}

/* .contact-btn {
  font-size: 1rem;
  border-width: 2px 3px 4px 2px;
  border-radius: 10px;
  border-color: black;
  background-color:hsla(339,0%,100%,1);
  background-image:
  radial-gradient(at 24% 54%, hsla(33,95%,67%,1) 0px, transparent 50%),
  radial-gradient(at 2% 46%, hsla(187,89%,74%,1) 0px, transparent 50%),
  radial-gradient(at 84% 95%, hsla(344,82%,76%,1) 0px, transparent 50%),
  radial-gradient(at 84% 21%, hsla(187,88%,74%,1) 0px, transparent 50%),
  radial-gradient(at 37% 9%, hsla(344,82%,76%,1) 0px, transparent 50%),
  radial-gradient(at 15% 85%, hsla(187,88%,74%,1) 0px, transparent 50%);
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0.0625px 0.19rem;
} */

div h1 {
  font-family: "bd-supper", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: #000000;
}

.blankspace {
  display: flex;
  align-items: center;
}


/*Footer*/


path {
  stroke: #000000;
  stroke-width: 2px;
}

.footer-grid-container {
padding: 0px 8rem 3rem 8rem;
}

.footer-grid {
  display: flex;
  justify-content: space-between;
}

.footer-grid h3{
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  color: #000000;
}
.footer-grid p{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}

</style>
