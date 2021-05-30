<template>
  <div class="home">
    
      <Sidebar :UserId="sendId"/>
    
    <div>
      <h2>Home</h2>
      <p>{{ message }}</p>
      <p>{{ name }}</p>
      <div>
        <ul>
          <li>{{　　}}</li>
          <li class="test"><img src="../assets/img/heart.png" alt=""></li>
          <li></li>
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
      message: 'No Login',
      name: 'No name'
    }
  },
  methods: {
  },
  async created() {
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
  }
}
</script>

<style scoped>
.test img {
  width: 20%;
}

.home {
  display: flex;
}

</style>