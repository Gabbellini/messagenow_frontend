<template>
  <div class="login">
    <ContainerView class="container-view">
      <form @submit.prevent="onSubmit">
        <div class="form__container">
          <h1><strong>Message.now</strong><br>Login</h1>
          <fieldset>
            <InputView id="email" type="email" label="Email" v-model:model-value="email"/>
            <InputView id="password" type="password" label="Password" v-model:model-value="password"/>
            <button class="button button--submit" id="submit" type="submit">Entrar</button>
          </fieldset>
        </div>
      </form>
      <div class="background"/>
    </ContainerView>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import ContainerView from "@/components/ContainerView.vue";
import InputView from "@/components/InputView.vue";
import {useStore} from "vuex";


export default defineComponent({
  name: 'LoginView',
  components: {InputView, ContainerView},

  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();

    const onSubmit = async (): Promise<void> => {
      try {
        await login();
      } catch (e) {
        console.log("[onSubmit] Error login ", e);
        alert(e);
      }
    };

    const login = async (): Promise<void> => {
      try {
        await store.dispatch("authorization_module/login", {email: email.value, password: password.value});
      } catch (e) {
        console.log("[login] Error dispatch ", e);
        throw e;
      }
    };

    return {
      email,
      password,
      onSubmit,
    }
  }
});
</script>

<style scoped>
.login {
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.container-view {
  display: flex;
  height: 800px;
  padding: 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

form {
  width: 50%;
  display: grid;
  place-items: center;
  padding: 3rem;
  box-sizing: border-box;
}

.form__container, fieldset {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.form__container {
  gap: 2rem;
  justify-content: space-between;
}

.form__container > h1 {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
}

.form__container > h1 > strong {
  font-weight: bold;
}

.button--submit {
  border: none;
  height: 3rem;
  background: #092045;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

.background {
  width: 50%;
  background-image: url("../../src/assets/login/background.png");
  background-size: cover;
  background-position: left;
}
</style>