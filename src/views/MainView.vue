<template>
    <el-container>

        <el-container>
            <el-header
                style="display: flex; width:100%; height:100px; align-items: center; justify-content: space-between; position: fixed; top: 0; z-index: 1000;">
                <img src="@/utils/images/pageLogo.png" alt="" class="logoStyle">
                <span>福州市至善竭诚慈善协会</span>
                <div style="display: flex; align-items: center;">
                    <el-dropdown @command="handleCommand">
                        <i class="el-icon-user-solid" style="margin-right: 15px;"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><router-link to="/UserCenter"
                                    class="routerStyle">个人中心</router-link></el-dropdown-item>
                            <el-badge :value=unreadInformationCount v-if="unreadInformationCount != 0" class="item">
                                <el-dropdown-item command="messageCenter">消息中心</el-dropdown-item>
                            </el-badge>
                            <el-dropdown-item v-if="unreadInformationCount == 0"
                                command="messageCenter">消息中心</el-dropdown-item>
                            <el-dropdown-item command="distributeCenter">订单中心</el-dropdown-item>
                            <el-dropdown-item command="userChatCenter">客服反馈</el-dropdown-item>
                            <el-dropdown-item command="exitLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>您好：{{ userMsg.userName }}</span>
                </div>
            </el-header>
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#12d3e0" text-color="#fff" style="position: fixed; height:60px; top: 100px; width: 100%; z-index: 999; display: flex; justify-content: center;">
                <el-menu-item class="menuStyle" index="1" @click="goToHomePage()">首页</el-menu-item>
                <el-menu-item class="menuStyle" index="2" @click="goToPoorArea()">贫困区域</el-menu-item>
                <el-submenu class="menuStyle" index="3">
                    <template slot="title"><span style="font-size: 20px;">公益捐赠</span></template>
                    <el-menu-item index="3-1" class="menuStyle" @click="goToRandomDistribute()">随心捐赠</el-menu-item>
                    <el-menu-item index="3-2" class="menuStyle" @click="goToPoorArea()">定向捐赠</el-menu-item>
                </el-submenu>
                <el-menu-item class="menuStyle" index="4" @click="goToJournal()">新闻动态</el-menu-item>

                <el-menu-item class="menuStyle" index="5" @click="goToIntroduction()">关于我们</el-menu-item>
            </el-menu>
            <el-main style="padding-top: 160px;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data() {
      return {
          userInfo: '',
          userMsg: {
              userId: '',
              userName: '',
              userAddress: '',
              userIdCard: '',
              userPhone: '',
              userSex: '',
              userState: '',
          },
          unreadInformationCount: '',
      }
  },
  methods: {
      //在首页显示登录用户的信息
      showUserMsg() {
          var usertxt = sessionStorage.getItem("userMsg");
          usertxt = JSON.parse(usertxt)
          this.userInfo = usertxt
          this.userMsg.userName = this.userInfo[0].userName
          this.userMsg.userId = this.userInfo[0].userId
          this.userMsg.userAddress = this.userInfo[0].userAddress
          this.userMsg.userIdCard = this.userInfo[0].userIdCard
          this.userMsg.userPhone = this.userInfo[0].userPhone
          this.userMsg.userSex = this.userInfo[0].userSex
          this.userMsg.userState = this.userInfo[0].userState
      },
      getUnreadInformation() {
          this.$axios.get(
              "/check/getUnreadInformation",
              {
                  params: {
                      userId: this.userMsg.userId
                  }
              }
          ).then(res => {
              if (res.data.code == 0) {
                  this.unreadInformationCount = res.data.total

              } else {

              }
          }).catch(err => {
              alert("请求失败");
          });
      },
      goToHomePage() {
          if (this.$route.path != '/HomePage') {
              this.$router.push('/HomePage')
          }
      },
      goToPoorArea(){
          if (this.$route.path != '/PoorArea') {
              this.$router.push('/PoorArea')
          }
      },
      goToIntroduction(){
          if (this.$route.path != '/Introduction') {
              this.$router.push('/Introduction')
          }
      },
      goToJournal(){
        if (this.$route.path != '/Journal') {
              this.$router.push('/Journal')
          }
      },
      goToRandomDistribute(){
        if (this.$route.path != '/RandomDIstribute') {
              this.$router.push('/RandomDIstribute')
          }
      },
      handleCommand(command) {
          if (command === 'exitLogin') {
              this.$router.push('/')
          } else if (command === 'messageCenter') {
              this.$router.push('/MessageCenter')
          } else if(command === 'userChatCenter'){
            this.$router.push('/UserChatView')
          } else if(command === 'distributeCenter'){
            this.$router.push('/DistributeCenter')
          }
      },


  },

  mounted() {
      this.showUserMsg()
      this.getUnreadInformation()
      
  },
  created(){
    this.goToHomePage()
  },

};
</script>

<style>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.logoStyle {
  widows: 70%;
  height: 70%;
}

.routerStyle {
  text-decoration: none !important;
  /* 去除下划线 */
  color: black !important;
  /* 设置字体颜色为黑色 */
}

.el-main {
  padding-top: 150px !important;
  /* padding: 0 !important; */
}
.el-menu-demo:hover{
  background-color:"#fff"
}
.menuStyle{
    width: 300px;
    font-size: 20px;
}
</style>