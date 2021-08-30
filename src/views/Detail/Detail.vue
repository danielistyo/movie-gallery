<template>
  <div class="movie">
    <i class="fas fa-times movie__back" @click="$router.back()"></i>
    <img v-if="movie" :src="$getImage('w500', movie.poster_path)" class="movie__poster" />
    <img v-if="movie" :src="$getImage('original', movie.backdrop_path)" class="movie__backdrop" />
    <div v-if="movie" class="movie__detail">
      <div class="movie__title">{{ movie.title }}</div>
      <div class="movie__subtitle">
        <div class="movie__genre">{{ genre }}</div>
        <div class="movie__date">
          <i class="far fa-calendar-alt"></i> {{ $dayjs(movie.release_date, 'YYYY-MM-DD').format('YYYY MMM DD') }}
        </div>
        <div class="movie__duration"><i class="fas fa-stopwatch"></i> {{ movie.runtime }} min</div>
      </div>
      <rating-star :value="movie.vote_average" class="movie__rating" />

      <div class="movie__overview">{{ movie.overview }}</div>
      <div v-if="movie.homepage" class="movie__links">
        <a :href="movie.homepage" target="_blank">WATCH IT NOW</a>
        <a :href="`https://www.imdb.com/title/${movie.imdb_id}`" target="_blank">IMDB</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/api';
import RatingStar from '@/components/RatingStar/RatingStar.vue';
import { Genre, Movie } from '@/typings';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Detail',
  components: { RatingStar },
  setup() {
    const store = useStore();
    const genres = computed<Genre[]>(() => {
      return store.state.genres;
    });

    const route = useRoute();
    const movie = ref<Movie>();

    onMounted(async () => {
      if (typeof route.params.id === 'string') {
        try {
          const res = await api.getDetail(parseInt(route.params.id, 10));
          movie.value = res.data;
        } catch (error) {
          console.error(error);
        }
      }
    });

    const genre = computed<undefined | string>(() => {
      if (!movie.value || !movie.value?.genres) return undefined;
      return movie.value?.genres?.[0].name;
    });

    return {
      genre,
      genres,
      movie,
    };
  },
});
</script>

<style lang="scss" scoped src="./Detail.scss"></style>
