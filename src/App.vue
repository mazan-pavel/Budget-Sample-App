<template>
  <div class="app">
    <BudgetForm @submitForm="onSubmitForm" />
    <BudgetTotal :total="totalBalance" />
    <BudgetList @deleteItem="onDeleteItem" :list="list" />
  </div>
</template>

<script>
import BudgetList from "./components/BudgetList.vue";
import BudgetTotal from "./components/BudgetTotal";
import BudgetForm from "./components/BudgetForm";

export default {
  name: "App",
  components: { BudgetList, BudgetTotal, BudgetForm },
  computed: {
    totalBalance() {
      return Object.values(this.list).reduce(
        (acc, curr) => acc + curr.value,
        0
      );
    },
  },
  methods: {
    onDeleteItem(id) {
      // this.$delete(this.list, id);
      delete this.list[id];
    },
    onSubmitForm(data) {
      const id = String(Math.random());
      const newItem = {
        ...data,
        id,
      };
      //если выбрали расход но указали число без минуса, меняем знак
      if (newItem.type === "OUTCOME" && newItem.value > 0)
        newItem.value = -newItem.value;
      this.list[id] = newItem;
    },
  },
  data: () => ({
    list: {},
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
