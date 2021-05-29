<template>
  <div class="home">
    <h2>Home</h2>
    <p>{{ message }}</p>
    <p>{{ name }}</p>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  data() {
    return {
      message: 'No Login',
      name: 'No name'
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/login')
        })
    }
  },
  async created() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          axios.get('http://127.0.0.1:8000/api/v1/test/?email=' + user.email)
            .then((res) => {
              // console.log(res.data.data.name);
              const testname = res.data.data.name;
              this.name = testname;
            })
          const test = firebase.auth().currentUser;
          if(test) {
            // axios.get('http://127.0.0.1:8000/api/v1/test/?email=' + test.email)
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