<template>
  <el-card class="form-card">
    <el-form
      :model="fromData"
      ref="addItemForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="Type" prop="type">
        <el-select
          class="type-select"
          v-model="fromData.type"
          placeholder="Choose type..."
        >
          <el-option label="Income" value="INCOME" />
          <el-option label="Outcome" value="OUTCOME" />
        </el-select>
      </el-form-item>
      <el-form-item label="Comments" prop="comment">
        <el-input v-model="fromData.comment"></el-input>
      </el-form-item>
      <el-form-item label="Value" prop="value">
        <el-input v-model.number="fromData.value"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </el-form>
  </el-card>
</template>

<script>
const validateNotZero = (rule, value, callback) => {
  if (value === 0) callback(new Error("Number cannot be zero!"));
  else callback();
};
export default {
  name: "Form",
  data: () => ({
    fromData: {
      type: "INCOME",
      comment: "",
      value: 0,
    },
    rules: {
      type: [
        {
          required: true,
          message: "Please select type",
          trigger: "blur",
        },
      ],
      comment: [
        {
          required: true,
          message: "Please input comment",
          trigger: "change",
        },
      ],
      value: [
        {
          required: true,
          message: "Please input value",
          trigger: "change",
        },
        {
          type: "number",
          message: "Value must be a number",
          trigger: "change",
        },
        {
          validator: validateNotZero,
          trigger: "blur",
        },
      ],
    },
  }),
  methods: {
    onSubmit() {
      this.$refs.addItemForm.validate((valid) => {
        if (valid) {
          this.$emit("submitForm", { ...this.fromData });
          this.$refs.addItemForm.resetFields();
        }
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}
.type-select {
  width: 100%;
}
</style>
