<template>
  <div class="page">
    <div class="login-form">
      登录
      <el-input class="input" placeholder="请输入用户名" prefix-icon="el-icon-edit">
      </el-input>
      <el-input class="input" placeholder="请输入密码" prefix-icon="el-icon-edit">
      </el-input>
    </div>
  </div>
</template>

<script>
import auth from "../util/auth.js";

export default {
  data() {
    return {};
  },
  title: "Login",
  components: {},
  mounted() {}
};
</script>

<style scoped lang="stylus">
.login-form {
  margin: 0 auto;
  margin-top: 300px;
  text-align: center;
  width: 50%;
}

.login-form .input {
  margin-top: 30px;
}
</style>
