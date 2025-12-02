<template>
  <div class="login-container">
    <el-card class="login-card">

      <el-form :model="UserMsg" :rules="rules" ref="UserMsg">
        <el-form-item label="用户账号" prop="userAccount">
          <el-input v-model="UserMsg.userAccount" placeholder="请输入用户手机号/身份证号" class="login-input"></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="userPassword">
          <el-input v-model="UserMsg.userPassword" placeholderUserMsg="请输入用户密码" type="password"
            class="login-input"></el-input>
        </el-form-item>

      </el-form>

      <div class="button-group">
        <el-button type="primary" round @click="handleLogin('UserMsg')">登录</el-button>
        <el-button type="primary" round @click="goToRegist()">注册</el-button>
      </div>
      <p class="findMsg" @click="goToReset()">忘记密码</p>
    </el-card>




  </div>
</template>

<script>
export default {
  data() {
    return {
      UserMsg: {
        userAccount: '',
        userPassword: '',
      },
      rules: {
        userAccount: [{ required: true, message: '用户账号不能为空', trigger: 'blur' }],
        userPassword: [{ required: true, message: '用户密码不能为空' }],
      },
      formLabelWidth: '120px',
      resetFormVisible: false,

    };
  },

  methods: {
    //用户登录功能
    handleLogin(userForm) {

      this.$refs[userForm].validate((valid) => {
        if (valid) {
          this.$axios.post(
            "/user/userLogin", null,
            {
              params: {
                userAccount: this.UserMsg.userAccount,
                userPassword: this.UserMsg.userPassword
              }
            }
          ).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '用户登录成功',
                type: 'success'
              });
              sessionStorage.setItem("userMsg", JSON.stringify(res.data.data))
              this.$router.push("/main")
            } else {
              this.$message.error('用户账号或密码错误');
            }

          }).catch(err => {

          })
        } else {
          alert("请输入正确格式")
        }
      })

    },
    goToRegist() {
      if (this.$route.path != '/Regist') {
        this.$router.push('/Regist')
      }
    },
    goToReset() {
      if (this.$route.path != '/Reset') {
        this.$router.push('/Reset')
      }
    }

  },
  mounted() {

  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background-image: url('@/utils/images/adminLoginImg1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}


.login-card {
  width: 300px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  background-color: rgba(255, 255, 255, 0.8);
  /* 卡片背景色，设置为白色并调整透明度 */

}

.login-title {
  text-align: center;
  /* 标题居中 */
  margin-bottom: 20px;
  /* 标题下边距 */
}

.login-input {
  margin-bottom: 10px;
  /* 输入框下边距 */
}

.button-group {
  display: flex;
  justify-content: center;
  /* 按钮之间留出空间 */
}

.findMsg {

  margin-left: 75%;
}
</style>
