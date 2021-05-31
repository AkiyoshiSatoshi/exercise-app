<template>
  <div class="home">
    
      <Sidebar :userId="sendId" :test="testitems"/>
    
    <div class="home_contents">
      <div class="home__bar">
        <h2>Home</h2>
        <p>{{ message }}</p>
        <p>{{ name }}</p>
      </div>
      
      <div>
        <ul>
          <li v-for="(item, index) in items" :key="item.id" class="share_item">
            <div class="item__top">
              <p>{{item.user_id}}</p>
              <img class="content__img" src="../assets/img/heart.png" alt="">
              <!-- <p>{{item.like.length}}</p> -->
              <img @click="deletePost(item.id)" class="content__img" src="../assets/img/cross.png" alt="">
              <img class="content__img" src="../assets/img/detail.png" alt="">
            </div>
            <p style=display:none;>{{index}}</p>
            <p class="share__content">{{item.contents}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import firebase from "firebase";
import axios from "axios";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      sendId: "",
      testitems: "",
      message: 'No Login',
      name: 'No name',
      items: [],
    }
  },

  
  methods: {
    async getPost() {
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/v1/post"
      );
    },
    async deletePost(id) {
      await axios.delete("http://127.0.0.1:8000/api/v1/post/" + id)
      .then((response) => {
        console.log(response);
      })
      this.getPost();
    }
  },


  

  async created() {

  /**Post get */
    axios.get("http://127.0.0.1:8000/api/v1/post")
      .then((response) => {
        // console.log(response);
        this.items = response.data.data;
        // console.log(respost);
      });
  /**Post get */

  /** firebase Authentication */
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          axios.get('http://127.0.0.1:8000/api/v1/login/?email=' + user.email)
            .then((res) => {
              const test = res.data.data;
              console.log(test.id);
              this.name = test.name;
              this.sendId = test.id;
              // console.log(testname);
            })
          const test = firebase.auth().currentUser;
          if(test) {
            // axios.get('http://127.0.0.1:8000/api/v1/login/?email=' + test.email)
            //   .then((response) => {
            //     // console.log(response.data.data.name);
            //     const testname = response.data.data.name;
            //     this.name = testname;
            //   })
              this.message = 'ログイン済みです'
          }
          
        }
      })
      
  /** firebase Authentication */
  }

  


}
</script>

<style scoped>

.home {
  display: flex;
  width: 100%;
}

.home__content {
  width: 100%;
}

.home__bar {
  font-size: 20px;
  padding: 20px 0 20px 20px;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
}

.share_item {
  padding-top: 20px;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
}

.item__top {
  display: flex;
  /* justify-content: space-around; */
}

.item__top p {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.content__img {
  width: 5%;
}

.content__img:nth-of-type(2) {
  margin-left: 20px;
}
.content__img:nth-of-type(3) {
  margin-left: 20px;
}

.share__content {
  width: 50%;
  padding-left: 10px;
  padding-bottom: 10px;
}

</style>