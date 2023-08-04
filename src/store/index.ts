import {createStore, ModuleTree} from 'vuex'
import authorization_module from "@/store/authorization_module";
import room_module from "@/store/room_module";

const modules: ModuleTree<any> = {
  authorization_module,
  room_module,
};


export default createStore({
  modules
})
