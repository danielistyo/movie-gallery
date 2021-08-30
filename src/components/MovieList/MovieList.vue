<template>
  <div class="movie-list">
    <movie-item
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @click="goToDetail(movie.id)"
      class="movie-list_item"
    />
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script lang="ts">
import { Movie } from '@/typings';
import { defineComponent, PropType } from '@vue/runtime-core';
import MovieItem from '../MovieItem';

export default defineComponent({
  name: 'MovieList',
  components: {
    MovieItem,
  },
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      default: () => [],
    },
  },
  methods: {
    goToDetail(id: number) {
      this.$router.push({ name: 'Detail', params: { id } });
    },
  },
});
</script>

<style lang="scss" scoped src="./MovieList.scss"></style>
