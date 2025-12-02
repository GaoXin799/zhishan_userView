<template>
    <div>
        <el-descriptions title="用户个人信息" direction="vertical" :column="3" border>
            <el-descriptions-item label="用户名">{{ userMsg.userName }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ userMsg.userPhone }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ userMsg.userIdCard }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ userMsg.userSex }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ userMsg.userAddress }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" @click="handleUpdate()">编辑资料</el-button>
        <el-button type="primary" @click="resetPasswordVisible = true">修改密码</el-button>


        <!-- 修改个人信息界面 -->
        <el-dialog title="个人信息修改" :visible.sync="updateFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.userName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
                    <el-input v-model="ruleForm.userPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.userIdCard" autocomplete="off" disabled></el-input>
                </el-form-item>
                性别：<el-select v-model="ruleForm.userSex" class="stateStyle">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="userAddress">
                    <el-input v-model="ruleForm.userAddress" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUserInfoMsg()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 用户修改密码界面 -->
        <el-dialog title="修改密码" :visible.sync="resetPasswordVisible">
            <el-form :model="newMessage" :rules="resetRules" ref="newMessage">
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input v-model="newMessage.newPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetUserPassword()">确 定</el-button>
            </div>
        </el-dialog>

    </div>


</template>

<script>
export default {
    data() {
        return {
            userInfo: '',
            formLabelWidth: '120px',
            userid: '',
            userMsg: {
                userId: '',
                userName: '',
                userAddress: '',
                userIdCard: '',
                userPhone: '',
                userSex: '',
                userState: '',
            },
            newMessage: {
                newPassword: '',
            },
            updateFormVisible: false,
            resetPasswordVisible: false,
            ruleForm: {},
            rules: {
                userPhone: [{ required: true, message: '用户手机号不能为空', trigger: 'blur' }],
                userAddress: [{ required: true, message: '用户地址不能为空', trigger: 'blur' }],

            },
            resetRules:{
                newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
            },
        };
    },

    methods: {
        getUserId() {
            var usertxt = sessionStorage.getItem("userMsg");
            usertxt = JSON.parse(usertxt)
            this.userInfo = usertxt
            this.userid = this.userInfo[0].userId

        },
        getUserInfoMsg(){
            this.$axios.get(
                        "/user/getUserInfoMsg",
                        {
                            params: {
                                userId: this.userid,
                            }
                        }
                    ).then(res => { 
                        if (res.data.total >= 1) {
                            this.userMsg = res.data.data[0]

                        } else {
                            this.$message.error('获取用户个人信息失败');
                        }

                    }).catch(err => { //通讯失败或报错

                    })
        },

        //修改个人信息
        handleUpdate() {
            this.ruleForm = {
                userName: this.userMsg.userName,
                userPhone: this.userMsg.userPhone,
                userIdCard: this.userMsg.userIdCard,
                userSex: this.userMsg.userSex,
                userAddress: this.userMsg.userAddress
            }

            this.updateFormVisible = true
        },

        updateUserInfoMsg(){

            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                  
                    this.$axios.patch(
                        "/user/updateUserInfoMsg",null,
                        {
                            params:{
                                userId: this.userMsg.userId,
                                userPhone: this.ruleForm.userPhone,
                                userSex: this.ruleForm.userSex,
                                userAddress: this.ruleForm.userAddress,
                            }
                        }
                      
                    ).then(res => { 
                        if (res.data.total >= 1) {
                            this.$message({
                                        message: '用户个人信息更新成功',
                                        type: 'success'
                                    });
                            this.updateFormVisible = false
                            this.getUserInfoMsg()

                        } else {
                            this.$message.error('修改失败');
                        }

                    }).catch(err => { //通讯失败或报错

                    })

                } else { // 校验不通过
                    this.$alert("修改信息不能为空！")
                }
            })
        },
        resetUserPassword(){
            this.$refs.newMessage.validate((valid) => {
                if (valid) {
                    this.$axios.patch(
                        "/user/resetUserPassword",null,
                        {
                            params: {
                                userId: this.userid,
                                userPassword: this.newMessage.newPassword
                            }
                        }
                    ).then(res => { 
                        if (res.data.total >= 1) {
                            this.$message({
                                        message: '修改密码成功',
                                        type: 'success'
                                    });
                                    this.getUserInfoMsg()
                                    this.newMessage.newPassword = ''
                            this.resetPasswordVisible = false

                        } else {
                            this.$message.error('修改密码失败！');
                        }

                    }).catch(err => { //通讯失败或报错

                    })
                   

                } else { 
                    this.$alert("修改新的密码不能为空")
                }
            })
        }

    },
    mounted() {
        this.getUserId()
        this.getUserInfoMsg()
    },
}
</script>

<style scoped></style>