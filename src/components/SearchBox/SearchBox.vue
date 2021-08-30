<template>
  <div class="searchbox">
    <input
      @input="handleChange"
      @focus="isFocus = true"
      @blur="handleBlur"
      class="searchbox__input"
      placeholder="Search your movie here"
    />
    <div v-if="isFocus" class="searchbox__suggestions">
      <div
        v-for="movie in searchedMovies"
        :key="movie.id"
        class="searchbox__suggestion suggestion"
        @click="handleClick(movie.id)"
      >
        <img :src="$getImage('w200', movie.poster_path)" class="suggestion__poster" />
        <div class="suggestion__detail">
          <div class="suggestion__title">
            {{ `${movie.title} (${$dayjs(movie.release_date, 'YYYY-mm-dd').format('YYYY')})` }}
          </div>
          <div class="suggestion__rate"><i class="fas fa-star"></i> {{ movie.vote_average }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import debounce from 'lodash/debounce';
import { Movie } from '@/typings';
import { useRouter } from 'vue-router';
import api from '@/api';

export default defineComponent({
  name: 'SearchBox',
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      default: () => [],
    },
  },
  setup(props) {
    const isFocus = ref(false);

    const searchedMovies = ref<Movie[]>([]);
    const handleChange = debounce(async (e) => {
      searchedMovies.value = [];
      const keyword = (e.target.value as string).toLowerCase().trim();
      if (!keyword || keyword.length < 3) return;

      // search in local for quick search
      const localRes = props.movies.filter((movie) => movie.title.toLowerCase().includes(keyword));
      searchedMovies.value = searchedMovies.value.concat(localRes);

      // search in server
      const res = await api.searchMovie({ sort_by: 'popularity.desc', include_adult: false, query: keyword });
      if (res.data?.results) {
        const existingIds = searchedMovies.value.map((movie) => movie.id);
        const filteredMovies = res.data?.results.filter((movie) => !existingIds.includes(movie.id));
        searchedMovies.value = searchedMovies.value.concat(filteredMovies);
      }
    }, 500);

    const router = useRouter();
    const handleClick = (id: number) => {
      router.push({ name: 'Detail', params: { id } });
    };

    const handleBlur = () => {
      setTimeout(() => {
        isFocus.value = false;
      }, 500);
    };

    return { handleChange, searchedMovies, handleClick, isFocus, handleBlur };
  },
});
</script>

<style lang="scss" scoped src="./SearchBox.scss"></style>
