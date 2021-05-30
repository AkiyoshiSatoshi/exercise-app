<template>
  <div class="sidebar">
    <img class="sidebar_img" src="../assets/img/logo.png" alt="">
    <div class="sidebar_content">
      <img src="../assets/img/home.png" alt="">
      <p>ホーム</p>
    </div>
    <div class="sidebar_content" @click="logout" >
      <img src="../assets/img/logout.png" alt="" >
      <p>ログアウト</p>
    </div>
    <div class="share_input">
      <p>シェア</p>
      <input type="text" v-model="share_post" class="share_post">
      <button @click="share">シェアする</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
  props:[
    "UserId"
  ],
  data() {
    return {
      share_post: ""
    }
  },
  
  // async created(){
  //   firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //     console.log(user);
  //   })
  // },
  methods: {
    async share() {
      
      await axios.get('http://127.0.0.1:8000/api/v1/user')

      const sendData = {
        contents: this.share_post,
        user_id: this.UserId,
        // post_id: 5,
      }
      console.log(sendData);
      await axios.post("http://127.0.0.1:8000/api/v1/post", sendData)
      .then((res) => {
        console.log(res);
      })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/login')
        })
    },
    // async share() {
    //   sendData = {

    //   }
    //   await axios.post('http://127.0.0.1:8000/api/v1/post',)
    //     .then((response) => {

    //     })
    // }
  }
}
</script>

<style scoped>
.sidebar {
  width: 30%;
  margin-left: 5px;
}

.sidebar_img {
  width: 50%;
  padding: 30px 0;
}


.sidebar_content {
  display: flex;
  margin-bottom: 20px;
}

.sidebar_content img {
  width: 10%;
}
.sidebar_content p {
  padding-left: 10px;
  padding-top: 5px;
}

.share_content {
  display: flex;
  flex-wrap: wrap;
  width: 30%;
}

.share_input p {
  padding: 10px 5px;
}

.share_input {
  width: 90%;
}

.share_post {
  height: 100px;
  width: 100%;
  background: #315eb1;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}

.share_input button {
  color: white;
  border: none;
  border-radius: 10px;
  background: #7aa8ff;
  display: block;
  margin: 5px 0 0 auto;
}
</style>