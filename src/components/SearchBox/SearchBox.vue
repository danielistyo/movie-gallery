<template>
  <div class="searchbox">
    <div class="searchbox__firstrow">
      <input
        id="inputSearch"
        @input="handleChange"
        @focus="isFocus = true"
        @blur="handleBlur"
        class="searchbox__input"
        placeholder="Search your movie here"
      />
      <div id="filterDate" />
      <i @click="handleDateClick" class="searchbox__calendar fa fa-calendar" />
    </div>

    <div v-if="selectedDates.length" class="searchbox__secondrow">
      Results:
      <span class="searchbox__rangedate">{{ selectedDates[0] }} - {{ selectedDates[1] }}</span>
      <i @click="handleRemoveDate" class="fa fa-times searchbox__removedate" />
    </div>

    <div v-if="isFocus" class="searchbox__suggestions">
      <div
        v-for="movie in searchedMovies"
        :key="movie.id"
        class="searchbox__suggestion suggestion"
        @click="handleClick(movie.id)"
      >
        <img v-lazy="$getImage('w200', movie.poster_path)" class="suggestion__poster" />
        <div class="suggestion__detail">
          <div class="suggestion__title">
            {{
              `${movie.original_title} ${
                movie.release_date ? `(${$dayjs(movie.release_date, 'YYYY-mm-dd').format('YYYY')})` : ''
              }`
            }}
          </div>
          <div class="suggestion__rate"><i class="fas fa-star"></i> {{ movie.vote_average }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, ref } from 'vue';
import debounce from 'lodash/debounce';
import { Movie } from '@/typings';
import { useRouter } from 'vue-router';
import api from '@/api';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import { Instance } from 'flatpickr/dist/types/instance';

export default defineComponent({
  name: 'SearchBox',
  emits: ['filterdate', 'removefilterdate'],
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isFocus = ref(false);

    const searchedMovies = ref<Movie[]>([]);

    const datepicker = ref<Instance>();
    const filteredMovies = ref<Movie[]>([]);
    const selectedDates = ref<string[]>([]);

    nextTick(() => {
      datepicker.value = flatpickr('#filterDate', {
        mode: 'range',
        maxDate: 'today',
        dateFormat: 'Y-m-d',
        onChange(dates) {
          if (!dayjs) return;
          if (dates.length === 2) {
            const beforeDate = dayjs(dates[0]);
            const afterDate = dayjs(dates[1]);
            filteredMovies.value = props.movies.filter((movie) => {
              return dayjs(movie.release_date, 'YYYY-MM-DD').isBetween(beforeDate, afterDate, 'days', '[]');
            });
            selectedDates.value.push(beforeDate.format('DD MMM YYYY'));
            selectedDates.value.push(afterDate.format('DD MMM YYYY'));
            emit('filterdate', filteredMovies.value);
          }
        },
      }) as Instance;
    });

    const handleDateClick = () => {
      datepicker.value?.open();
    };

    const handleRemoveDate = () => {
      selectedDates.value = [];
      datepicker.value?.clear();
      emit('removefilterdate');
    };

    const handleChange = debounce(async (e) => {
      searchedMovies.value = [];
      // remove filter date first
      handleRemoveDate();

      const keyword = (e.target.value as string).toLowerCase().trim();
      if (!keyword || keyword.length < 3) return;

      // search in local for quick search
      const localRes = props.movies.filter((movie) => movie.title.toLowerCase().includes(keyword));
      searchedMovies.value = searchedMovies.value.concat(localRes);

      // search in server
      const res = await api.searchMovie({ include_adult: false, query: keyword });
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
      }, 200);
    };

    return {
      handleChange,
      searchedMovies,
      handleClick,
      isFocus,
      handleBlur,
      handleDateClick,
      handleRemoveDate,
      datepicker,
      selectedDates,
    };
  },
});
</script>

<style lang="scss" scoped src="./SearchBox.scss"></style>
