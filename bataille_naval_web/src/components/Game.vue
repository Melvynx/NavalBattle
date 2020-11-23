<template>
  <div id="game">
    <Board idBoard="player1" />
    <State />
    <Board idBoard="player2" />
  </div>
</template>

<script>
import Board from './Board.vue';
import State from './State.vue';

export default {
  name: 'Game',
  components: {
    Board,
    State,
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
