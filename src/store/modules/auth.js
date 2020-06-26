import qs from "qs";
import router from "../../router";
import cookies from "vue-cookies";

const state = {
  token: cookies.get("imgur_token"),
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  logout({ commit }) {
    // state.token 값 null로 바꾸기
    //  context.commit('함수이름',갈 인자)
    // 인자에 {commit} 을 해서 비구조화 할당을 함
    commit("setToken", null);
    cookies.remove("imgur_token");
  },
  login() {
    const ROOT_URL = "https://api.imgur.com";
    const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
    const queryString = {
      client_id: CLIENT_ID,
      response_type: "token",
    };
    const fullUrl = `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`;
    window.location.href = fullUrl;
  },
  finalizeLogin({ commit }, hashString) {
    const queryObject = qs.parse(hashString.replace("#", ""));
    commit("setToken", queryObject.access_token);
    cookies.set("imgur_token", queryObject.access_token);
    router.push("/");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

// `http://localhost:8081/oauth2/callback
// #
// access_token=a537756fa6bbf15def80bc5c0b132d95a21548b2
// &
// expires_in=315360000&token_type=bearer
// &
// refresh_token=32533f726338a022ee9beb6478d29435362580ee
// &
// account_username=openprime15
// &
// account_id=133451147`
