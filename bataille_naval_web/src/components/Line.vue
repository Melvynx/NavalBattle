<template>
  <div class="cell"></div>
</template>

<script>
export default {
  name: 'Cellule',
  props: {
    cell: Object,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  width: 45px;
  height: 45px;
  border: 0.5px solid black;
}
</style>
