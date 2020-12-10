<template>
  <div class="cell">
    <div>
      <p v-if="isCurrentUser">
        <span v-if="cell.isBoat">🚢</span>
        <span v-if="cell.isHit">❌</span>
      </p>
      <p v-else>
        <span v-if="cell.isHit">
          <span v-if="cell.isBoat">❌🚢</span>
          <span v-else>❌</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cellule',
  props: {
    cell: Object,
    isCurrentUser: Boolean,
  },
  methods: {},
};
</script>

<style scoped>
.cell {
  width: 45px;
  height: 45px;
  border: 0.5px solid black;
}
</style>
