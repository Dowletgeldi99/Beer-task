import Vue from "vue";
import App from './views/App';
import store from './vuex/store';

const app = new Vue({
    el : '#app',
    render: h => h(App),
    store
}).$mount('#app');