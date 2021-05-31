<template>
  <div>
    <Header/>
    <div class="login">
      <h2>ログイン</h2>
      <div class="login_content">
        <label for="">
          <input type="email" v-model="email" name="email" required placeholder="Email"/>
        </label>
        <br />
        <label for="">
          <input type="password" v-model="password" name="password" required placeholder="Password"/>
        </label>
        <br />
        <button @click="login">ログイン</button>
      </div>
      <NuxtLink to="/register">新規登録</NuxtLink>
      <NuxtLink to="/home">Home</NuxtLink>
      <!-- test api get -->
      <!-- <div class="test">
        {{ test }}
      </div> -->
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import axios from "axios";
export default {
  data() {
    return {
      email: null,
      password: null,
      // test: null
    }
  },
  // mounted() {
  //   axios
  //     .get('http://127.0.0.1:8000/api/v1/user')
  //     .then((response) => (this.test = response.data.data[0].name));
  // },
  methods: {
    /**Login(firebase) */
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。');
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          alert('ログインが完了しました')
          this.$router.push('/home')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    }
    /**Login(firebase) */
  }
  
}
</script>

<style scoped>
.login {
  text-align: center;
  width: 50%;
  margin: 150px auto;
  background: white;
  border-radius: 20px;
  padding: 20px 0;
}
h2 {
  color: black;
}

.login_content {
  padding-top: 20px;
}

input {
  border: 1px solid black;
  margin-bottom: 10px;
  height: 30px;
  width: 70%;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  color: white;
  background: #315EB1;
}
</style>