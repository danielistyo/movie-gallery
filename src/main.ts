import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import getImage from '@/helpers/image';
import dayjs from 'dayjs';
import '@/assets/scss/main.scss';

const app = createApp(App);

app.config.globalProperties.$getImage = getImage;
app.config.globalProperties.$dayjs = dayjs;

app.use(store).use(router).mount('#app');
