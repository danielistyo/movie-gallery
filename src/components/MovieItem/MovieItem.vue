<template>
  <div @mouseenter="toggleDetail(true)" @mouseleave="toggleDetail(false)" class="movie">
    <img :src="$getImage('w200', movie.poster_path)" class="movie__poster" />
    <transition name="fade">
      <div v-if="showDetail" class="movie__detail">
        <div class="movie__title">
          {{ movie.title }}
          <div class="movie__year">{{ $dayjs(movie.release_date, 'YYYY-mm-dd').format('YYYY') }}</div>
        </div>

        <div class="movie__rating">
          <template v-for="(rs, i) in ratingStars" :key="i">
            <i :class="rs"></i>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Movie } from '@/typings';
import { defineComponent, PropType } from '@vue/runtime-core';

export default defineComponent({
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
  computed: {
    ratingStars() {
      const arr = new Array(5);
      const rating = Math.round(this.movie.vote_average);

      for (let i = 1; i <= arr.length; i++) {
        const FULL = 'fas fa-star',
          HALF = 'fas fa-star-half-alt',
          EMPTY = 'far fa-star';
        let type: typeof FULL | typeof HALF | typeof EMPTY = EMPTY;

        if (rating >= i * 2) {
          type = FULL;
        }
        if (rating === i * 2 - 1) {
          type = HALF;
        }
        arr[i - 1] = type;
      }
      return arr;
    },
  },
  methods: {
    toggleDetail(isShow: boolean) {
      this.showDetail = isShow;
    },
  },
});
</script>

<style lang="scss" scoped src="./MovieItem.scss"></style>
