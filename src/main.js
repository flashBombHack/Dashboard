import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification';
import 'vue-awesome-paginate/dist/style.css';
import Paginate from 'vue-awesome-paginate';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import globalMixin from './tokenExpirationMixin.js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { eventBus } from './eventBus';
import ChartsVue from '@carbon/charts-vue';
import vue3GoogleLogin from 'vue3-google-login';
import VueTelInputLib from 'vue-tel-input';

window.$ = window.jQuery = require('jquery');
import './assets/dataTables.bootstrap4.min.css';
import './assets/dataTables.bootstrap4.css';

const app = createApp(App);

const env = process.env.NODE_ENV || 'staging';

const CLIENT_ID = "630385307462-qk2a81ln2aeha25dbh4j8qqckd7l3fdj.apps.googleusercontent.com";

const paypalScript = document.createElement('script');
paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=AVBQYwpUqBlg6hv26c0rj3TjbEM8Ixy9pWEay7dSYopznRkzpRf1idUlcTvbEucScWfDnZHWLmqeeIxN&intent=subscription&vault=true&disable-funding=paylater,card');
document.head.appendChild(paypalScript);


let config;
switch (env) {
  case 'development':
    config = require('./config/config.development.js');
    break;
  case 'staging':
    config = require('./config/config.staging.js');
    break;
  case 'production':
    config = require('./config/config.production.js');
    break;
  default:
    throw new Error(`Unsupported environment: ${env}`);
}

// Use the configuration
console.log('Using configuration for environment:', env);
console.log('API_BASE_URL:', config.API_BASE_URL);





app.use(router);
app.use(Notifications);
app.use(Paginate);
app.use(VueToast);
app.use(ChartsVue)
app.component('VueDatePicker', VueDatePicker);
app.mixin(globalMixin);
app.use(eventBus);
app.use(VueTelInputLib);
app.use(vue3GoogleLogin,{
  clientId:CLIENT_ID,
});


app.config.globalProperties.$config = config;

app.mount('#app');
