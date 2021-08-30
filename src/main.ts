import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import getImage from '@/helpers/image';
import dayjs from 'dayjs';
import '@/assets/scss/main.scss';
import { Lazyload } from '@vant/lazyload';
import isBetween from 'dayjs/plugin/isBetween';

const app = createApp(App);

app.use(Lazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/error.png'),
  attempt: 1,
});

app.config.globalProperties.$getImage = getImage;

dayjs.extend(isBetween);
app.config.globalProperties.$dayjs = dayjs;

app.use(store).use(router).mount('#app');
