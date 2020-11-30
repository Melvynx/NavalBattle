import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('getColumns', function(arr, yCoords) {
  const v = arr
    .filter((a) => a.corrdsY === yCoords)
    .sort((a, b) => a.corrdsX > b.corrdsX);

  console.log(v);

  return v;
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
