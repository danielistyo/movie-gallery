<template>
  <div class="app">
    <template v-if="$route.name === 'List'">
      <img class="app__logo" src="/logo.png" />
      <div class="app__title">MOVIE GALLERY</div>
    </template>
    <router-view v-slot="{ Component }">
      <transition>
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import api from '@/api';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(async () => {
      try {
        const store = useStore();
        const res = await api.getGenres();
        store.commit('setGenres', res.data.genres);
      } catch (error) {
        console.error(error);
      }
    });
  },
});
</script>

<style lang="scss">
html {
  background-color: #000;
}
.app {
  max-width: 820px;
  margin: auto;

  &__logo {
    width: 50px;
    margin: 10px 0;
    display: inline-block;
    vertical-align: middle;
  }

  &__title {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-size: 30px;
  }
}
</style>
