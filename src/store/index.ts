import { createStore } from 'vuex'
import authorization_module from "@/store/authorization_module";

export default createStore({
  modules: {
    authorization_module
  }
})
