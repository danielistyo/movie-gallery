import { Genre } from '@/typings';
import { createStore } from 'vuex';

export default createStore<{ genres: Genre[] }>({
  state: { genres: [] },
  mutations: {
    setGenres(state, genres) {
      state.genres = genres;
    },
  },
  actions: {},
  modules: {},
});
