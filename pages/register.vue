<template>
  <div class="register">
    <h2>新規登録</h2>
    <div class="register_content">
      <label for="">
        ユーザー名: <input type="text" name="username" id="" v-model="name" required />
      </label>
      <br />
      <label for="">
        メールアドレス: <input type="email" name="email" v-model="email" required />
      </label>
      <br />
      <label for="">
        パスワード: <input type="password" name="password" v-model="password" required />
      </label>
      <br />
      <button @click="register">新規登録</button>
      <br />
      <NuxtLink to="/login">ログイン</NuxtLink>

    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    async register() {
      if (!this.email || !this.password || !this.name) {
        alert('メールアドレス、パスワードまたは名前が入力されていません。')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          data.user.sendEmailVerification().then(() => {
            this.$router.replace('/login')
          })
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
      const sendData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      await  axios.post('http://127.0.0.1:8000/api/v1/user', sendData)
        .then((data) => {
          console.log(data);
        })
    }
  }
}
</script>