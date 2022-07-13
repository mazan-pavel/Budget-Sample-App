<template>
  <div class="total-value" :style="{ color: textColor }">
    Balance: {{ total }}
  </div>
</template>

<script>
export default {
  name: "Total balance",
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    textColor() {
      let color = "";
      switch (true) {
        case this.total > 0:
          color = "green";
          break;
        case this.total < 0:
          color = "red";
          break;
        default:
          color = "black";
      }
      return color;
    },
  },
};
</script>

<style scoped>
.total-value {
  text-transform: uppercase;
  font-size: 26px;
  padding: 20px;
  text-align: center;
}
</style>
