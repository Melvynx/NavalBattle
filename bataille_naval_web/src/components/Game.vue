<template>
  <div id="game">
    <div v-if="this.idGame === null">
      <button v-on:click="this.startGame">Start new Game</button>
    </div>
    <div v-else>
      <Board
        idBoard="player1"
        v-bind:idGame="String(idGame)"
        :isCurrentUser="false"
      />
      <State />
      <Board
        idBoard="player2"
        v-bind:idGame="String(idGame)"
        :isCurrentUser="true"
      />
      <button v-on:click="this.stopGame">stop game</button>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue';
import State from './State.vue';
import { getItemLocalStorage } from '../utils/localStorage';

export default {
  name: 'Game',
  components: {
    Board,
    State,
  },
  data: function() {
    return {
      idGame: getItemLocalStorage('game-key', null),
    };
  },
  methods: {
    startGame: function() {
      const id = '1';
      window.localStorage.setItem('game-key', id);
      this.idGame = id;
    },
    stopGame: function() {
      window.localStorage.removeItem('game-key');
      this.idGame = null;
    },
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
