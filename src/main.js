import Vue from 'vue';
import ElementUI from 'element-ui';  // 引入Element-UI
import 'element-ui/lib/theme-chalk/index.css';  // 引入样式
import App from './App.vue';

Vue.use(ElementUI);  // 全局注册Element-UI组件
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app');