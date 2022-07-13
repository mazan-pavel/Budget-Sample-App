<template>
  <div class="list-item">
    <el-icon v-if="item.type === 'OUTCOME'" :size="size" :color="textColor"
      ><Bottom
    /></el-icon>
    <el-icon v-else-if="item.type === 'INCOME'" :size="size" :color="textColor"
      ><Top
    /></el-icon>
    <span class="budget-comment">{{ item.comment }}</span>
    <span class="budget-value" :style="{ color: textColor }">{{
      item.value
    }}</span>
    <el-button type="danger" @click="deleteItem(item.id)">Delete</el-button>
  </div>
</template>

<script>
export default {
  name: "BudgetListItem",
  props: {
    item: { type: Object, default: () => ({}) },
  },
  data: () => ({
    size: 20,
  }),
  methods: {
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
  },
  computed: {
    textColor() {
      let color = "";
      switch (true) {
        case this.item.value > 0:
          color = "green";
          break;
        case this.item.value < 0:
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
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
</style>
