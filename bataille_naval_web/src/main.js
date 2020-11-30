import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('getColumns', function(arr, yCoords) {
  console.log('getColumns with y :', yCoords);
  const u = arr.filter((a) => {
    console.log("I'm going to compare : ", a.id, a.corrdsY, yCoords);
    return a.corrdsY === yCoords;
  });
  console.log('Result : ', u);
  return u;
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
