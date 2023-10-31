<script setup>

</script>

<template>
  <div class="about 2xl:px-32 2xl:py-12 xl:px-32 xl:py-12 lg:px-28 lg:py-8 md:px-24 md:py-6 sm:px-8 sm:py-5">

  <div class="about-container1 sm:flex-wrap md:flex-wrap">

    
    <div class="about-general 2xl:w-3/5 xl:w-3/5 lg:w-full md:w-full sm:w-full">
    <h2>Hi im Anne-Sofie, <br> and this is everything about me.</h2>
    <div class="sm:text-sm">
    <h3>General information</h3>
    <p>
        <span>Name:</span> Anne-Sofie Walz <br>
        <span>Age:</span> 23 years old <br>
        <span>Occupation:</span> Currently on 3rd semester, <br>
        studying Multimediadesign at Business Academy Southwest <br>
        <span>Location:</span> Esbjerg, Denmark <br>  
        <span>Email:</span> annwal01@easv365.dk or Fiewalz@yahoo.dk <br>
        <span>LinkedIn:</span> www.linkedin.com/in/anne-sofienwalz


    </p>
  </div>

      <button class="download-cv font-bold" href="https://erhvervsakademisydvest-my.sharepoint.com/:b:/g/personal/annwal01_easv365_dk/EfZ_OPx6-nRKj2Pb8urT1pUB2qOY4BEHzbunuUZcTpbZ1A?e=Fyfw4I" alt="button that links to cv on onedrive">Download CV</button>
    </div>

    <div class="about-photo 2xl:w-2/5 xl:w-2/5 lg:w-full md:w-full sm:w-full justify-end md:justify-start sm:justify-start">
      <img class="portrait" src="../assets/Portraitforweb.jpg" alt="Portrait of Anne-Sofie">

    </div> 

  </div>

    <div class="future w-full sm:text-sm">
      <h3>Past, present and future</h3>
        <p>
          Im a 23 year old born and raised dane, who is currently on her 3rd semester studying multimedia design. I have a lot of passions surounding design and webdevelopment,
          I am super passionate about the creative process from idea to the finished product, I love being a part of a team, and it brings me lots of joy to be a part of something with likeminded people.
          I am always curious about the world around me, therefore i love meeting new people and hearing their ideas, and even better collaborating with them to create something awesome. 
          That curiosity also plays into how im always learning new skills and researching the newest trends. <br>

          In my free time i enjoy a lot of creative and musical hobbies. I love writing poetry in a journal, and pairing it with matching artwork. I also attend a choire every week, where community is valued highly. 
          I love talking to a lot of different people, about our joined love for music. These are the things that helps me unwind and helps me to stay creative.
          <br>
          In the future i want to work in one of these areas, an forever better my skills: ux/ui design, graphic design and web development. Because i love creation, in many different forms.
        
        </p>

        <div class="video-box"></div>
            <iframe class="videocv" 
            src="https://www.youtube.com/embed/k3OH_uXeImo">
            </iframe>
        </div>

          </div>

</template>

<style>
  .about {
    min-height: 100vh;
    display: flex-start;
    max-width: fit-content;
  }

  .about-container1 {
    display: flex;
    justify-content: space-between;
  }
  .about-photo {
    display: flex;
  }

  div h2 {
    font-family: "bd-supper", sans-serif;
    color: #020202;
    font-size: 2rem;
  }

  div p {
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #020202;
  }
  
 
  .about h3 {
    font-weight: bold;
    font-family: "bd-supper", sans-serif;
    padding-top: 28px;
    font-size: 1rem;
    color: #020202;
  }

  div span {
    font-weight: bold;
  }

  .download-cv {

  }

.download-cv:hover {
  transform: scale(1.1);
}

.video-box {
  margin-top: 2.5rem;
}

@media screen and (max-width: 1535px) {
  
.videocv{
height: 300px;
width: 500px;
}

};

@media screen and (max-width: 700px) {
  
  .videocv{
  height: 200px;
  width: 400px;
  }
  
};

@media screen and (max-width: 600px) {
  
  .videocv{
  height: 250px;
  width: 350px;
  }
  
};

@media screen and (max-width: 500px) {
  
  .videocv{
  height: 150px;
  width: 250px;
  }
  
};

</style>
