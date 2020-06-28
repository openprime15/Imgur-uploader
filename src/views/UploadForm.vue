<template>
  <div class="dropper">
    <input @change="uploadImages" type="file" multiple accept="image/*" />
    <span>Drag images here</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UploadForm",
  methods: mapActions(["uploadImages"])
};
</script>

<style>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  /* 상하,좌우 중앙정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 내부속성에 영향을 미치는 메소드 */
  position: relative;
}
.dropper:hover {
  background-color: #999;
}

input {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
</style>