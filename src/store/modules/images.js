import axios from "axios";
import router from "../../router";

const state = {
  images: [],
};

const getters = {
  allImages: (state) => state.images,
};

const mutations = {
  setImages: (state, images) => (state.images = images),
};

const actions = {
  //fetch: 밖에서 가지고 온다는 느낌
  fetchImages({ rootState, commit }) {
    const fullUrl = "https://api.imgur.com/3/account/me/images";
    const config = {
      headers: {
        Authorization: `Bearer ${rootState.auth.token}`,
      },
    };
    //async 쓰게되면 axios를 이하와 같이 수정가능
    // const res = await axios.get(fullUrl, config);
    // commit('getImages',res.data.data)
    axios
      .get(fullUrl, config)
      .then((response) => commit("setImages", response.data.data))
      .catch((err) => console.err(err.response));
  },
  uploadImages({ rootState }, event) {
    const fullUrl = "https://api.imgur.com/3/image";
    const images = event.target.files;
    const config = {
      headers: {
        // 1. token이 필요
        Authorization: `Bearer ${rootState.auth.token}`,
      },
    };

    const promises = [];

    images.forEach((image) => {
      const formData = new FormData();
      formData.append("image", image);
      const promise = axios.post(fullUrl, formData, config);
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        router.push({ name: "ImageList" });
      })
      .catch((err) => console.log(err));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
