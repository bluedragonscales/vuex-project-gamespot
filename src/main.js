import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Store from './store';
import Toaster from "@meforma/vue-toaster";
import Router from './routes.js';
import './firebase';

// Created an instance of the createApp library so that we can inject customized modules and libraries into our application.
const app = createApp(App);

// Using the Store modules we created.
app.use(Store);
// Using the ant design npm package.
app.use(Antd);
// Using the toasters npm package.
app.use(Toaster);
// Using the routes for our application pages.
app.use(Router);

// Finally mounting the createApp instance to be used as the main application.
app.mount("#app");