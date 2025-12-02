<template>
    <!-- 用户订单中心页面 -->
    <div>
        <el-card class="elCard">
            <span>订单审核状态：</span>
                <el-select v-model="SearchState" placeholder="" class="selectStyle" @change="getUserDistributeMessage(userid)">
                    <el-option label="同意" value="同意"></el-option>
                    <el-option label="不同意" value="不同意"></el-option>
                </el-select>

            <el-card v-for="(item, index) in userDistributeMsg" :key="index" class="CountyCard">
        <div class="countyInfo" >
            <i class="el-icon-user-solid"></i><el-tag type="warning">寄送地:</el-tag><span style="padding-left: 10px;">{{ item.sendAddress }}</span>

            <i class="el-icon-platform-eleme" style="padding-left: 30px;"></i><el-tag>送至:</el-tag><span style="padding-left: 10px; padding-right:30px;">{{ item.receiveProvince }} {{ item.receiveCity }} {{ item.receiveCounty }}</span>

            
                <el-tag type="success"  v-if=" (item.distributeState === '已审核') && (item.checkResult === '同意') ">订单生效中</el-tag> 
                <el-tag type="danger" v-if=" (item.distributeState === '已审核') && (item.checkResult === '不同意') ">订单失效</el-tag> 
           
                <el-tag type="danger" v-if=" item.distributeState === '未审核' ">订单审核中</el-tag> 

                <span style="padding-left: 10px;" v-if="item.checkResult === '同意'">物流状态：{{ item.deliveryState }}</span>


          <div style="padding-left: 30px;">
            <el-button type="info" icon="el-icon-message" circle  @click="DetailMsg(item)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteMsg(item)"></el-button>
            <!-- <el-button class="btnStyle"  type="info" @click="DetailMsg(item)">详情</el-button>
            <el-button class="btnStyle" type="danger" @click="deleteMsg(item)">删除</el-button> -->
          </div>
          <span class="timeStyle">时间:{{ item.distributeTime.split('T')[0] }}</span>
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
            userid: '',
            userDistributeMsg: [],
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
      SearchState: '同意'

        };
    },

    methods: {
        getUserId() {
            var usertxt = sessionStorage.getItem("userMsg");
            usertxt = JSON.parse(usertxt)
            this.userInfo = usertxt
            this.userid = this.userInfo[0].userId
            this.getUserDistributeMessage(this.userid)
        },

        handleSizeChange(val) {
      this.size = val
      this.currentPage = 1
      this.getUserDistributeMessage(this.userid)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserDistributeMessage(this.userid)
    },

        getUserDistributeMessage(userId) {
            this.$axios.get(
                "/distribute/getUserDistributeMessage",
                {
                    params: {
                        userId: userId,
                        checkResult: this.SearchState,
                        curr: this.currentPage,
                        size: this.size,
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    // alert("获取用户个人信息成功")
                    this.userDistributeMsg = res.data.data
                    this.totalPage = res.data.total

                } else {
                    this.$message.error('暂未有满足该条件的订单');
                }

            }).catch(err => { //通讯失败或报错

            })
        },
        DetailMsg(item){
          
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
                } else {
                    this.$message.error('查看捐赠订单详情失败');
                }

            }).catch(err => { 

            })
          
        },
        deleteMsg(item){
         
            this.$axios.patch(
                "/distribute/deleteDistributeMsg",null,
                {
                    params: {
                      distributeId: item.distributeId
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: '删除订单成功',
                        type: 'success'
                    });
                    this.currentPage = 1
                    this.getUserDistributeMessage(this.userid)
                    
                } else {
                    this.$message.error('删除订单失败');
                }

            }).catch(err => { 

            })
        },


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