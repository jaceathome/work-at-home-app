<template>
  <div  id="aboutApp">
    <header>
      <nav id="navbar" :class="{'sticky' : is_sticky}" class="white">
        <div class="d-flex justify-space-between align-center">
          <div><a href="#" id="logoLink" class="font-weight-bold">WorkAtHome</a></div>
          <div class="links d-flex align-center">
            <div><a class="link" href="#features">Features</a></div>
            <div><a class="link" href="#mission">Mission</a></div>
            <div><a class="link" href="#team">Developers</a></div>
            <div><a class="link" href="#footer">Contact</a></div>
            <div>
              <v-btn :to="{name: 'login'}" color="primary" small>Login</v-btn>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <v-row id="hero" class="pa-sm-12">
        <v-col cols="12" sm="6" class="d-flex justify-end pt-10 revealT">
          <div>
            <h1>Page Title</h1>
            <p style="max-width: 55ch">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum ipsum itaque quasi quidem repellat veritatis voluptates.</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="revealR">
          <v-card width="fit-content" height="fit-content" class="">
            <img style="max-height: 300px" :src="task_mgmt" alt="">
          </v-card>
        </v-col>
      </v-row>

      <div id="features" class="jumbotron mt-3 lightBg">
        <h2 class="">Highlight Features</h2>
        <p class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur ea exercitationem expedita pariatur quidem ratione repellat saepe totam voluptatibus?</p>
      </div>

      <v-row class=" feature pa-sm-8 mt-0">
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-end revealL">
          <v-card style="width: fit-content; height: fit-content" class="">
            <img :src="user_mgmt" alt="">
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center pl-sm-4 revealB">
          <h2>User Management</h2>
          <p style="max-width: 55ch">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corporis fugiat, illum iure modi nam necessitatibus ratione! Nam.</p>
          <div>
            <v-btn color="primary">Click me!</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row class="lightBg feature pa-sm-8">
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-end revealL">
          <div>
            <h2>Role Assignment</h2>
            <p style="max-width: 55ch">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corporis fugiat, illum iure modi nam necessitatibus ratione! Nam.</p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="revealR">
          <v-card style="width: fit-content; height: fit-content" class="">
            <img :src="role_mgmt" alt="">
          </v-card>
        </v-col>
      </v-row>

      <v-row class=" feature pa-sm-8">
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-end revealL">
          <v-card style="width: fit-content; height: fit-content" class="">
            <img :src="task_mgmt" alt="">
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center pl-sm-4 revealR">
          <h2>Task Management</h2>
          <p style="max-width: 55ch">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corporis fugiat, illum iure modi nam necessitatibus ratione! Nam.</p>
        </v-col>
      </v-row>

      <v-divider class="mx-10"/>

      <div id="videoFeed" class="revealB">
        <div class="videoContainer">
          <video controls :src="video"></video>
        </div>
        <div class="d-flex flex-column align-center">
          <h2>Explore</h2>
          <p style="max-width: 75ch">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error magnam minus molestiae obcaecati quidem totam.</p>
        </div>
      </div>

      <v-divider class="ma-10"/>

      <v-row id="mission" class="pa-5 text-center" style="min-height: 420px">
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-center px-4 revealB" style="background: rgba(24,24,24,0.98)">
          <h1 class="white--text mb-10">Our Mission</h1>
          <p class="white--text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur deleniti dolores doloribus, eum impedit iusto laudantium minus modi, non optio perferendis quaerat quia sequi suscipit. Aspernatur, culpa enim, eveniet fuga natus quae quasi, quia quod reprehenderit repudiandae similique voluptate?</p>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-center px-4 revealT">
          <h1 class="mb-10">Our Vision</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias assumenda consequuntur delectus eaque excepturi exercitationem expedita facilis fugit impedit ipsa iure laboriosam magnam magni, nostrum quae quia repellendus rerum voluptate voluptatem.</p>
        </v-col>
      </v-row>


      <v-divider class="ma-10"/>

      <div class="d-flex flex-column align-center text-center">
        <h2>Meet the team</h2>
        <p style="max-width: 75ch">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, fugit?
        </p>
      </div>

      <div class="d-flex justify-center px-5 px-sm-10">
        <v-row id="team" class="d-flex justify-center mx-auto">
          <v-col class="shadow-lg" cols="6" sm="3">
            <v-card max-width="255px" class="pa-4 revealB">
              <img src="https://joeschmoe.io/api/v1/joe" alt="">
                <h4>Jace Dela Cruz</h4>
                <p>The Developer</p>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card max-width="255px" class="pa-4 revealB">
              <img src="https://joeschmoe.io/api/v1/male/random" alt="">
                <h4>Jace Dela Cruz</h4>
                <p>The Developer</p>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card max-width="255px" class="pa-4 revealB">
              <img src="https://joeschmoe.io/api/v1/female/random" alt="">
                <h4>Jace Dela Cruz</h4>
                <p>The Developer</p>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card max-width="255px" class="pa-4 revealB">
              <img src="https://joeschmoe.io/api/v1/random" alt="">
                <h4>Jace Dela Cruz</h4>
                <p>The Developer</p>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </main>

    <div id="contact" class="d-flex justify-center flex-column align-center mt-16 pa-5">
      <h2>Contact Us</h2>
      <form method="post" action="https://formsubmit.co/jaceworkathome@gmail.com" style="width: 100%; max-width: 580px">
        <v-text-field name="name" class="revealTF" required label="Name" />
        <v-row>
          <v-col>
            <v-text-field name="email" class="revealLF" required prepend-inner-icon="mdi-email" type="email" label="Email" />
          </v-col>
          <v-col>
            <v-text-field name="phone" class="revealRF" required prepend-inner-icon="mdi-phone" type="number" label="Phone Number" />
          </v-col>
        </v-row>
        <v-text-field name="subject" class="revealLF" required label="Subject" />
        <v-textarea name="message" class="revealBF" required label="Message" />
        <v-btn class="revealLF" type="submit" color="primary">Send Message</v-btn>
      </form>
    </div>
    <footer id="footer">
      <p class="revealT">
        Copyright &copy; 2021-2022 - All rights reserved.
      </p>
      <div class="social_icons">
        <div class="icon"><a href="https://www.facebook.com"><v-icon class="revealB" dark>mdi-facebook</v-icon></a></div>
        <div class="icon"><a href="https://www.twitter.com"><v-icon class="revealB" dark>mdi-twitter</v-icon></a></div>
        <div class="icon"><a href="https://www.instagram.com"><v-icon class="revealB" dark>mdi-instagram</v-icon></a></div>
      </div>
    </footer>
  </div>
</template>

<script>
import video from "@/assets/video.mp4";
import user_mgmt from "@/assets/user_mgmt.png";
import role_mgmt from "@/assets/role_mgmt.png";
import task_mgmt from "@/assets/task_mgmt.png";

export default {
  name: "About",
  data: () => ({
    video,
    user_mgmt,
    role_mgmt,
    task_mgmt,
    is_sticky: false
  }),
  methods: {
    scroll(){
      this.is_sticky = window.pageYOffset >= document.getElementById('navbar').offsetTop+1;
    }
  },
  mounted(){
    window.addEventListener('scroll', this.scroll)
    ScrollReveal({duration: 1500, reset: true})
    ScrollReveal().reveal(".revealL", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "left",
    });
    ScrollReveal().reveal(".revealLF", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "left",
      reset: false
    });
    ScrollReveal().reveal(".revealR", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "right",
    });
    ScrollReveal().reveal(".revealRF", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "right",
      reset: false
    });
    ScrollReveal().reveal(".revealT", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "top",
    });
    ScrollReveal().reveal(".revealTF", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "top",
      reset: false
    });
    ScrollReveal().reveal(".revealB", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "bottom",
    });
    ScrollReveal().reveal(".revealBF", {
      delay: 500,
      interval: 700,
      distance: "200px",
      origin: "bottom",
      reset: false
    });
  }
}
</script>

<style>
body {
  width: 100vw;
  overflow-x: hidden;
}
</style>

<style scoped>
.revealT,
.revealTF,
.revealR,
.revealRF,
.revealL,
.revealLF,
.revealB,
.revealBF
{
  /*opacity: 0;*/
  visibility: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1.6;
}
#aboutApp {
  width: 100%;
}
nav {
  padding: 2rem;
  transition: all .4s ease-in;
  width: 100%;
}

nav.sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  box-shadow: 1px 0 5px 0 black;
}

.links div {
  margin-left: 1rem;
}
.links a {
  color: black;
  transition: transform .2s; /* Animation */
}
a.link:hover {
  color: #0d47a1;
  transform: scale(1.5);
}
#logoLink{
  color: #000;
}
#hero {
  height: 450px;
  overflow: hidden;
}
.lightBg{
  background: rgba(233, 233, 233, .4);
}
.jumbotron {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.jumbotron p {
  max-width: 80ch;
  color: rgba(0,0,0,.5);
}

.feature {
  height: 450px;
}
.feature img {
  max-height: 340px;
  height: auto;
}
#videoFeed {
  padding: 20px 100px;
}
#videoFeed div {
  text-align: center;
  margin: 1rem 0;
}
.videoContainer {
  max-height: 720px;
  overflow: hidden;
  border-radius: 10px;
}
video {
  width: 100%;
  height: 100%;
}
#team img {
  max-width: 300px;
}
#team {
  margin-top: 2rem;
}
footer {
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(24,24,24,0.98);
  color: #fff;
  margin-top: 8rem;
  overflow: hidden;
}
.social_icons {
  display: flex;
  justify-content: space-between;
  min-width: 120px;
}

#team img {
  max-height: 255px;
}

@media screen and (max-width: 569px){
  .links .link {
    display: none;
  }

  #videoFeed {
    padding: 10px;
  }

}
</style>