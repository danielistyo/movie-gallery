<template>
  <div>
    <movie-list :movies="movies" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MovieList from '@/components/MovieList';
import api from '@/api';
import { Movie } from '@/typings';

type Data = {
  movies: Movie[];
};

export default defineComponent({
  name: 'List',
  components: {
    MovieList,
  },
  data(): Data {
    return {
      movies: [],
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    async getMovies() {
      try {
        const res = await api.getList({
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: 1,
        });
        this.movies = res.data.results;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
