<template>
  <div>
    <search-box :movies="movies" />
    <movie-list :movies="movies" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import MovieList from '@/components/MovieList';
import api from '@/api';
import { Movie } from '@/typings';
import SearchBox from '@/components/SearchBox/SearchBox.vue';

export default defineComponent({
  name: 'List',
  components: {
    MovieList,
    SearchBox,
  },
  setup() {
    const movies = ref<Movie[]>([]);
    const page = ref(1);
    const isLoadingMovie = ref(false);

    const handleScroll = (ev: Event) => {
      const bodyEl = (ev.target as Document).body;
      if (window.scrollY + window.innerHeight + 30 >= bodyEl.scrollHeight) {
        getMovies();
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    const getMovies = async () => {
      if (isLoadingMovie.value) return;
      try {
        isLoadingMovie.value = true;
        const res = await api.getList({
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: page.value,
        });
        page.value += 1;
        movies.value = movies.value.concat(res.data.results);
        isLoadingMovie.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    getMovies();

    return {
      movies,
      page,
    };
  },
});
</script>
