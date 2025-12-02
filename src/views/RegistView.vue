<template>
    <div class="login-container">

        <el-card class="loginCard">
            <el-page-header @back="goBack" content="注册页面"></el-page-header>
            <el-form :model="registForm" :rules="rules" ref="registForm">
                <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="registForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
                    <el-input v-model="registForm.userPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
                    <el-input v-model="registForm.userPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="userIdCard">
                    <el-input v-model="registForm.userIdCard" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="userAddress">
                    <el-input v-model="registForm.userAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="userSex">
                    <el-select v-model="registForm.userSex" class="stateStyle">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
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
                userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
                userPhone: [{ required: true, message: '用户手机号不能为空', trigger: 'blur' }],
                userPassword: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
                userIdCard: [{ required: true, message: '用户身份证号码不能为空', trigger: 'blur' }],
                userAddress: [{ required: true, message: '用户地址不能为空', trigger: 'blur' }],
                userSex: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }]
            },
            formLabelWidth: '120px',
            registForm: {
                userName: '',
                userPhone: '',
                userPassword: '',
                userIdCard: '',
                userAddress: '',
                userSex: ''
            },

        };
    },

    methods: {

        registUser() {
            this.$refs.registForm.validate((valid) => {
                if (valid) {
                    this.$axios.get(
                        "/user/checkUserExit",
                        {
                            params: {
                                userIdCard: this.registForm.userIdCard
                            }
                        }
                    ).then(res => {
                        console.log("res")
                        if (res.data.code == 0) {
                            this.$message.error('该身份证已被注册过！');
                        } else {
                            this.$axios.post(
                                "/user/registUser",null,
                                {
                                    params: {
                                        userName: this.registForm.userName,
                                        userPhone: this.registForm.userPhone,
                                        userPassword: this.registForm.userPassword,
                                        userIdCard: this.registForm.userIdCard,
                                        userAddress: this.registForm.userAddress,
                                        userSex: this.registForm.userSex,
                                    }
                                }
                            ).then(res => {
                                console.log("res")
                                if (res.data.code == 0) {
                                     this.$message({
                                        message: '注册成功',
                                        type: 'success'
                                    });
                                    this.$router.push('/')
                                } else {
                                    this.$message.error('注册失败！');
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