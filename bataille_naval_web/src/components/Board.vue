<template>
  <div class="board-wrapper">
    <table class="board">
      <tbody>
        <tr v-for="n in 5" v-bind:key="n" class="line">
          <Cellule
            v-for="cell in $options.filters.getColumns(cells, n)"
            v-bind:key="cell.id"
            v-bind:cell="cell"
          />
        </tr>
      </tbody>
    </table>
    <!-- <div class="board">
      <Cellule v-for="cell in cells" v-bind:key="cell.id" />
    </div> -->
  </div>
</template>

<script>
import Cellule from './Cellule';
import board from '../data/board.json';

export default {
  name: 'Board',
  props: {
    idBoard: String,
  },
  components: {
    Cellule,
  },
  data: function() {
    return {
      cells: board[this.idBoard],
    };
  },
  methods: {
    showData: function() {
      console.log('show');
      console.log(this.cells);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  display: flex;
}
.board {
  width: 240px;
  height: 240px;
  display: flex;
  flex-wrap: wrap;
}
.board-wrapper {
  display: flex;
  justify-content: center;
}
</style>
