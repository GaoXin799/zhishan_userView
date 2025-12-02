<template>
    <div>
        <el-card class="elCard">

            <el-card v-for="(item, index) in userCheckMsg" :key="index" class="CountyCard">
        <!-- <img class="countyImg" src="@/utils/images/adminLoginImg1.png" alt=""> -->
        <div class="countyInfo" >
            <el-tag type="success" v-if=" item.checkLookState ==='已读' ">已读</el-tag>
            <el-tag type="danger" v-if=" item.checkLookState ==='未读' ">未读</el-tag>
          <span class="checkTitleStyle" style="color: green;" v-if=" item.checkResult === '同意' ">您有一条捐赠申请通过</span>
          <span class="checkTitleStyle" style="color: red;" v-if=" item.checkResult === '不同意' ">您有一条捐赠申请被拒绝</span>
          <div class="countyInfo2">
            <el-button class="btnStyle" type="info" @click="seeDetailMsg(item)">详情</el-button>
            <el-button class="btnStyle" type="danger" @click="deleteMsg(item)">删除</el-button>
            <span v-if=" item.checkResult ==='不同意' " class="refuseStyle">拒绝理由：{{ item.checkMark}}</span>
            <span class="timeStyle">时间：{{ item.checkTime.split('T')[0] }}</span>
          </div>
        </div>



        <el-dialog title="捐赠订单详情" :visible.sync="DistributeDetailVisible">
            <el-descriptions  direction="vertical" :column="3" border>
            <el-descriptions-item label="用户名">{{ DistributeDetailMsg.userName }}</el-descriptions-item>
            <el-descriptions-item label="用户手机号">{{ DistributeDetailMsg.userPhone }}</el-descriptions-item>
            <el-descriptions-item label="用户地址">{{ DistributeDetailMsg.sendAddress }}</el-descriptions-item>
            <el-descriptions-item label="捐赠目的地">{{ DistributeDetailMsg.receiveProvince }}{{ DistributeDetailMsg.receiveCity }}{{ DistributeDetailMsg.receiveCounty }}</el-descriptions-item>
            <el-descriptions-item label="捐赠物图片">
                <img :src="DistributeDetailMsg.distributeImage" alt="" height="100px" width="100px" />
                </el-descriptions-item>
            <el-descriptions-item label="捐赠物类型">{{ DistributeDetailMsg.distributeType }}</el-descriptions-item>
            <el-descriptions-item label="捐赠备注">{{ DistributeDetailMsg.distributeMark }}</el-descriptions-item>

        </el-descriptions>
        <div slot="footer" class="dialog-footer">
          <el-button @click="DistributeDetailVisible = false">返 回</el-button>
        </div>
      </el-dialog>


      </el-card>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[3, 5]" :page-size="size"
                layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />

        </el-card>



    </div>


</template>

<script>
export default {
    data() {
        return {
            userInfo: '',
            formLabelWidth: '120px',
            userid: '',
            userCheckMsg: [],
            currentPage: 1,
      size: this.size,
      totalPage: 1,
      DistributeDetailMsg: {
        distributeId: '',
        userName: '',
        userPhone: '',
        sendAddress: '',
        receiveProvince: '',
        receiveCity: '',
        receiveCounty: '',
        distributeImage: '',
        distributeType: '',
        distributeMark: '',

      },
      DistributeDetailVisible: false,

        };
    },

    methods: {
        getUserId() {
            var usertxt = sessionStorage.getItem("userMsg");
            usertxt = JSON.parse(usertxt)
            this.userInfo = usertxt
            this.userid = this.userInfo[0].userId
            this.getUserCheckMessage(this.userid)
        },

        handleSizeChange(val) {
      this.size = val
      this.currentPage = 1
      this.getUserCheckMessage(this.userid)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserCheckMessage(this.userid)
    },

        getUserCheckMessage(userId) {
            this.$axios.get(
                "/check/getUserCheckMessage",
                {
                    params: {
                        userId: userId,
                        curr: this.currentPage,
                        size: this.size,
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.userCheckMsg = res.data.data
                    this.totalPage = res.data.total

                } else {
                    this.$message.error('获取用户个人信息失败');
                }

            }).catch(err => { //通讯失败或报错

            })
        },
        seeDetailMsg(item){
          
          this.$axios.get(
                "/distribute/getDistributeDetail",
                {
                    params: {
                      distributeId: item.distributeId
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.DistributeDetailMsg.distributeId = res.data.data[0].distributeId
                    this.DistributeDetailMsg.userName = res.data.data[0].userName
                    this.DistributeDetailMsg.userPhone = res.data.data[0].userPhone
                    this.DistributeDetailMsg.sendAddress = res.data.data[0].sendAddress
                    this.DistributeDetailMsg.receiveProvince = res.data.data[0].receiveProvince
                    this.DistributeDetailMsg.receiveCity = res.data.data[0].receiveCity
                    this.DistributeDetailMsg.receiveCounty = res.data.data[0].receiveCounty
                    this.DistributeDetailMsg.distributeImage = res.data.data[0].distributeImage
                    this.DistributeDetailMsg.distributeType = res.data.data[0].distributeType
                    this.DistributeDetailMsg.distributeMark = res.data.data[0].distributeMark
                    this.DistributeDetailVisible = true

                    this.updateCheckLookState(item.checkId)
                    
                } else {
                    this.$message.error('查看捐赠订单详情失败');
                }

            }).catch(err => { 

            })
          
        },
        deleteMsg(item){
         
            this.$axios.patch(
                "/check/deleteMsg",null,
                {
                    params: {
                      distributeId: item.distributeId
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: '删除信息成功',
                        type: 'success'
                    });
                    this.currentPage = 1
                    this.getUserCheckMessage(this.userid)
                    
                } else {
                    this.$message.error('删除信息失败');
                }

            }).catch(err => { 

            })
        },
        updateCheckLookState(checkid){
            this.$axios.patch(
                "/check/updateCheckLookState",null,
                {
                    params: {
                        checkId: checkid
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.currentPage = 1
                    this.getUserCheckMessage(this.userid)

                } else {

                }

            }).catch(err => { //通讯失败或报错

            })
        }


    },
    mounted() {
        this.getUserId()

    },
}
</script>

<style scoped>

.elCard{
    height: 600px;
}

.CountyCard {
  margin-bottom: 20px;
  height: 100px;
}

.countyInfo {
  /*文字左对齐 */
  /* text-align: left; */
  display: flex;
  align-items: center;
  padding: 10px; /* 添加一些内边距 */
  
}

.countyInfo2 {
    display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;


}

.checkTitleStyle {
  font-size: 21px;
  font-weight: bold;
  color: #333;
  padding-left: 20px;
  padding-right: 20px;
}

.refuseStyle{
    padding-left: 30px;
}

.timeStyle{
    margin-left: auto;
}



</style>