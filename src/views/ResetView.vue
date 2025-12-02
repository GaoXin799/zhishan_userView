<template>
    <div class="login-container">

        <el-card class="loginCard">
            <el-page-header @back="goBack" content="找回密码页面"></el-page-header>
            <el-form :model="resetForm" :rules="rules" ref="resetForm">
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="userIdCard">
                    <el-input v-model="resetForm.userIdCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
                    <el-input v-model="resetForm.userPassword" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>

            <div class="button-group">
                <el-button type="primary" @click="registUser()">立即注册</el-button>
            </div>
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
                userPassword: [{ required: true, message: '用户账号不能为空', trigger: 'blur' }],
                userIdCard: [{ required: true, message: '用户账号不能为空', trigger: 'blur' }]
            },
            formLabelWidth: '120px',
            resetForm: {
                userPassword: '',
                userIdCard: ''
            },

        };
    },

    methods: {

        registUser() {
            this.$refs.resetForm.validate((valid) => {
                if (valid) {
                    this.$axios.get(
                        "/user/checkUserExit",
                        {
                            params: {
                                userIdCard: this.resetForm.userIdCard
                            }
                        }
                    ).then(res => {
                        console.log("res")
                        if (res.data.code == 1) {
                            this.$message.error('该用户尚未注册');
                        } else {
                            this.$axios.patch(
                                "/user/resetPasswordByIdCard",null,
                                {
                                    params: {
                                        userPassword: this.resetForm.userPassword,
                                        userIdCard: this.resetForm.userIdCard
                                    }
                                }
                            ).then(res => {
                                console.log("res")
                                if (res.data.code == 0) {
                                     this.$message({
                                        message: '修改密码成功',
                                        type: 'success'
                                    });
                                    this.$router.push('/')
                                } else {
                                    this.$message.error('修改密码失败！');
                                }
                            }).catch(err => {
                            })
                        }

                    }).catch(err => {

                    })

                } else { // 校验不通过
                    this.$alert("请输入正确格式")
                }
            })
        },
        goBack() {
            this.$router.push('/')
        },


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


.loginCard {
    width: 500px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
    background-color: rgba(255, 255, 255, 0.8);
    /* 卡片背景色，设置为白色并调整透明度 */

}
</style>