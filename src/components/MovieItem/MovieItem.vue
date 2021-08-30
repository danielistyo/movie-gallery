<template>
  <div @mouseenter="toggleDetail(true)" @mouseleave="toggleDetail(false)" class="movie">
    <img v-lazy="$getImage('w200', movie.poster_path)" class="movie__poster" />
    <transition name="fade">
      <div v-if="showDetail" class="movie__detail">
        <div class="movie__title">
          {{ movie.title }}
          <div class="movie__year">{{ $dayjs(movie.release_date, 'YYYY-mm-dd').format('YYYY') }}</div>
        </div>

        <rating-star :value="movie.vote_average" class="movie__rating" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Movie } from '@/typings';
import { defineComponent, PropType } from '@vue/runtime-core';
import RatingStar from '../RatingStar/RatingStar.vue';

export default defineComponent({
  components: { RatingStar },
  name: 'MovieItem',
  props: {
    movie: {
      type: Object as PropType<Movie>,
      default: null,
    },
  },
  data() {
    return {
      showDetail: false,
    };
  },
  methods: {
    toggleDetail(isShow: boolean) {
      this.showDetail = isShow;
    },
  },
});
</script>

<style lang="scss" scoped src="./MovieItem.scss"></style>
