import { createApp } from 'vue';
import { MotionPlugin } from 'motion-v';
import App from './App.vue';
import '../css/style.css';

const app = createApp(App);
app.use(MotionPlugin);
app.mount('#app');
