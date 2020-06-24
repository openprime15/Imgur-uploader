import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //핵심 데이터
  },
  getters: {
    // state (가공한) getter
  },
  mutations: {
    //state를 변경하는 함수(반드시 동기)
  },
  actions: {
    // 기타 모든 함수(비동기 가능)
  },
  modules: {
    //쪼개기
    auth,
  },
});
