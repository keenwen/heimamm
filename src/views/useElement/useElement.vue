<template>
    <div>
        <h1>使用Element</h1>
        <h3>1.0 使用输入框</h3>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-user" v-model="input1">
        </el-input>
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input1">
        </el-input>
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input1">
        </el-input>
    </div>
</template>

<script>
export default {
  data () {
    return {
        input1: ''
    }
  }
}
</script>

<style>

</style>
