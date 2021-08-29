<template>
  <div>
    <movie-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MovieList from '@/components/MovieList/MovieList.vue';
import api from '@/api';

export default defineComponent({
  name: 'List',
  components: {
    MovieList,
  },
  created() {
    api.getList({
      sort_by: 'release_date.desc',
      include_adult: false,
      include_video: false,
      page: 1,
    });
  },
});
</script>
