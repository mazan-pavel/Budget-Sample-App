<template>
  <div class="budget-list-wrap">
    <el-dialog
      v-model="dialogVisible"
      title="Delete item from balance?"
      width="30%"
    >
      <span>Are you sure delete item from Balance?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="deleteItem">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-radio-group v-model="filterType" size="large">
      <el-radio-button label="ALL" />
      <el-radio-button label="INCOME" />
      <el-radio-button label="OUTCOME" />
    </el-radio-group>
    <el-card :header="header">
      <template v-if="!isEmpty">
        <BudgetListItem
          @deleteItem="onDeleteItem"
          v-for="(item, prop) in filtredList"
          :key="prop"
          :item="item"
        />
      </template>
      <el-alert v-else type="info" :title="titleAlert" :closable="false" />
    </el-card>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem";
export default {
  name: "BudgetList",
  components: { BudgetListItem },
  computed: {
    filtredList() {
      //если список пустой значит нечего фильтровать
      if (!Object.keys(this.list).length || this.filterType === "ALL")
        return { ...this.list };
      const newList = Object.fromEntries(
        Object.entries(this.list).filter((el) => el[1].type === this.filterType)
      );
      return newList;
    },
    isEmpty() {
      return !Object.keys(this.filtredList).length;
    },
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      idDeleteItem: null,
      header: "Budget List",
      titleAlert: "Список пуст!",
      dialogVisible: false,
      filterType: "ALL",
    };
  },
  methods: {
    onDeleteItem(id) {
      this.dialogVisible = true;
      this.idDeleteItem = id;
    },
    deleteItem() {
      this.$emit("deleteItem", this.idDeleteItem);
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}
</style>
