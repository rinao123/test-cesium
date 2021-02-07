<template>
  <div class="park3d" id="park3d" />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import Renderer from "./renderer";

export default class Park3d extends Vue {
  renderer: Renderer;

  constructor(props: unknown) {
    super(props);
    this.renderer = new Renderer();
  }

  mounted() {
    this.init();
  }

  init = (): void => {
    this.renderer.init();
  }
}
</script>

<style scoped>
.park3d {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
