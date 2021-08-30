<template>
  <div class="app">
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
  max-width: 1000px;
  margin: auto;
}
</style>
