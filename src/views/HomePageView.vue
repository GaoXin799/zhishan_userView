<template>

    <div>

        <div class="banner-container">
            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img style="height: 500px;" :src="imagePaths[item - 1]" alt="轮播图片" class="banner-image">
                </el-carousel-item>
            </el-carousel>
        </div>


        <el-card shadow="hover" style="text-align: center;">
            <div class="cardStyle">
                <div class="columnStyle">
                    <div class="titleStyle">累计捐助次数(次)</div>
                    <div class="numStyle">{{ totalDIstributeNum }}</div>

                </div>
                <div class="columnStyle">
                    <div class="titleStyle">累计贫困县数(个)</div>
                    <div class="numStyle">{{ totalCountyNum }}</div>
                </div>
                <div class="columnStyle">
                    <div class="titleStyle">爱心人数(人)</div>
                    <div class="numStyle">50,967</div>
                </div>
            </div>
        </el-card>

        <el-card class="distributeStyle">
            <div class="distributeListStyle">
                <p v-for="(item, index) in DistributeList" :key="index"><span>{{ item.userName }} 向 {{
                        item.receiveCounty }}捐助了一批物资</span></p>
            </div>
            <div class="buttonContainer">
                <el-button type="danger" class="distributeBtnStyle" @click="goToDistribute()">点击捐赠</el-button>
            </div>
        </el-card>

        <div class="newsBorderStyle">
            <div class="newsStyle">
                <div style=" height:30px; display: flex; ">
                    <p class="newTitleStyle">新闻中心</p>
                </div>
                <el-divider></el-divider>
                <div class="journalMsgTitle">
                    <p v-for="(item, index) in JournalList" :key="index" @click="goToJournalDetail(item)"><span>{{ item.journalTitle }} <span></span>{{ item.journalAddTime }}</span></p>
                </div>
            </div>

            
        </div>




    </div>





</template>

<script>
export default {
    data() {
        return {
            carouselHeight: '150px', // 可动态调整高度
            imagePaths: [
                require('@/utils/images/HomePageImage/image1.png'),
                require('@/utils/images/HomePageImage/image2.png'),
                require('@/utils/images/HomePageImage/image3.png'),
                require('@/utils/images/HomePageImage/image4.png')
            ],
            totalDIstributeNum: '',
            totalCountyNum: '',
            DistributeList: [],
            JournalList: [],
        }
    },
    methods: {
        getTotalDistributeNum(){
            this.$axios.get(
                        "/county/getTotalDistributeNum",
                        {
                            params: {
                                
                            }
                        }
                    ).then(res => { 
                        if (res.data.code == 0) {
                            this.totalDIstributeNum = res.data.data
                        } else {
                            
                        }

                    }).catch(err => { //通讯失败或报错

                    })
        },
        getTotalCountyNum(){
            this.$axios.get(
                        "/county/getTotalCountyNum",
                        {
                            params: {
                                
                            }
                        }
                    ).then(res => { 
                        if (res.data.code == 0) {
                            this.totalCountyNum = res.data.data
                        } else {
                            
                        }

                    }).catch(err => { //通讯失败或报错

                    })
        },
        getDistributeList(){
            this.$axios.get(
                        "/distribute/getDistributeList",
                        {
                            params: {
                                
                            }
                        }
                    ).then(res => { 
                        if (res.data.code == 0) {
                            this.DistributeList = res.data.data
                        } else {
                            
                        }

                    }).catch(err => { //通讯失败或报错

                    })
        },
        goToDistribute(){
            if (this.$route.path != '/PoorArea') {
              this.$router.push('/PoorArea')
          }
        },
        getJournalMsg(){
            this.$axios.get(
                        "/journal/getJournalMsg",
                        {
                            params: {
                                
                            }
                        }
                    ).then(res => { 
                        if (res.data.code == 0) {
                            this.JournalList = res.data.data
                        } else {
                            
                        }

                    }).catch(err => { //通讯失败或报错

                    })
        },

        goToJournalDetail(item){
            sessionStorage.setItem("JournalDetailInfo",JSON.stringify(item))
            if (this.$route.path != '/JournalDetail') {
                this.$router.push('/JournalDetail')
            }
        },

    },
    mounted() {
        this.getTotalDistributeNum()
        this.getTotalCountyNum()
        this.getDistributeList()
        this.getJournalMsg()
    },
}
</script>

<style scoped>

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover
}


.cardStyle{
    display: flex;
    justify-content: space-around
}

.columnStyle {
    /* 水平排列，排列方式：按列 */
    display: flex;
    flex-direction: column
}

.titleStyle {
    color: gray;
    font-size: 20px;
}

.numStyle {
    margin-top: 8px;
    font-size: 45px;
    color: rgb(247, 69, 24);
}

.distributeStyle{
    height: 200px;
    width: 70%;
    margin: auto;
}

.distributeListStyle{
    height: 200px;
    overflow-y: auto; /* 设置垂直方向可滚动 */
    width: 50%;
    float: left;
    
}
.distributeBtnStyle{
    margin-top: 80px;
}
.newsBorderStyle{
    height: 300px;
    border: 1px solid;
    background-color: aliceblue;
}
.newsStyle{
    width: 70%;
    margin: auto;
    height: 90%;
    /* background-color: aqua; */
   
}

.newTitleStyle{
    color: rgb(0, 0, 0);
    font-size: 20px;
    align-items: center;   
}

.journalMsgTitle{
    text-align: left;
 
}

.journalMsgTitle p:hover span {
    color: #007bff; 
    /* 下划线 */
    text-decoration: underline; 
}


</style>