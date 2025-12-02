<template>
    <div class="chatContainer">
        <div class="chaHeader">
            <h3>聊天界面</h3>
        </div>
        <div class="chatBody">
            <div class="contentStyle">
                <div class="content" v-for="(item, index) in chatContentList" :key="index">
                    <img src="@/utils/images/chatImg/adminChatImg.png" alt="" width="50px" height="50px"
                        v-if="item.chatRole === '管理员'">
                    <img src="@/utils/images/chatImg/userChatImg.png" alt="" width="50px" height="50px"
                        v-if="item.chatRole === '用户'">
                    <span style="font-size: 20px;">：{{ item.chatContent }}</span>
                    <span class="timeStyle">{{ item.chatAddTime }}</span>
                </div>
            </div>
        </div>
        <div class="chatFooter">
            <div class="input-group">
                <input type="text" v-model="chatContent" placeholder="输入消息..." />
                <el-button type="primary" @click="userSendMessage()">发送</el-button>
                <el-button type="danger" @click="userDeleteMessage()">清除信息</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            chatContentList: [],
            intervalId: null,
            chatUserId: '',
            chatUserName: '',
            chatContent: '',
        }
    },
    methods: {

        showUserMsg() {
          var usertxt = sessionStorage.getItem("userMsg");
          usertxt = JSON.parse(usertxt)
          this.chatUserId = usertxt[0].userId
          this.chatUserName = usertxt[0].userName
      },

        getChatUserList() {
            this.$axios.get(
                    "/chat/getChatListByUserId",
                    {
                        params: {
                            userId: this.chatUserId
                        }
                    }
                ).then(res => {
                    if (res.data.total >= 0) {
                        this.chatContentList = res.data.data;
                    } else {

                    }
                }).catch(err => {

                });
        },

        userSendMessage() {
            if(this.chatContent == ''){
                this.$message.error('发送内容不能为空！');
            }else {
                this.$axios.post(
                    "/chat/userSendMessage",null,
                    {
                        params: {
                            userId: this.chatUserId,
                            userName: this.chatUserName,
                            chatContent: this.chatContent
                        }
                    }
                ).then(res => {
                    if (res.data.total >= 0) {
                        this.$message({
                            message: '发送成功！',
                            type: 'success'
                        });
                        this.chatContent = ''
                    } else {

                    }
                }).catch(err => {

                });
            }
        },
        userDeleteMessage(){
            this.$axios.patch(
                    "/chat/userDeleteMessage",null,
                    {
                        params: {
                            userId: this.chatUserId
                        }
                    }
                ).then(res => {
                    if (res.data.total >= 0) {
                        this.$message({
                            message: '清除聊天记录成功！',
                            type: 'success'
                        });
                    } else {

                    }
                }).catch(err => {

                });
        }

    },
    mounted() {
        this.showUserMsg()
        this.timer = setInterval(this.getChatUserList, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
};
</script>


<style scoped>
.chatContainer {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chaHeader {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    text-align: center;
}

.chatBody {
    height: 500px;
    overflow-y: scroll;
}

.message {
    background-color: #e9e9e9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.message-user {
    text-align: right;
}

.chatFooter {
    background-color: #f0f0f0;
    padding: 10px;
}

.input-group {
    display: flex;
}

.input-group input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.userListStyle {
    float: left;
    width: 10%;
    height: 100%;
    background-color: #ccc;
    overflow-y: scroll;
}

.contentStyle {
    float: left;
    width: 100%;
    height: 100%;

}


.content {
    display: flex;
    /* 使用flex布局 */
    align-items: center;
    /* 垂直居中对齐 */
    text-align: left;
    /* 文本在最左边对齐 */
}

.timeStyle {
    margin-left: 10px;
    font-size: 20px;
    color: gray;
}
</style>