<template>
    <el-card class="cardStyle">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div class="content-container">
            <!-- 图片和标题显示在同一行 -->
            <div class="image-title-container">
                <img :src="countyImg" alt="" height="300px" width="300px" />
                <p>{{ CountyMsg.countyName }}</p>
                <el-tag>{{CountyMsg.provinceName }}</el-tag>
                <el-tag type="success">{{ CountyMsg.cityName }}</el-tag>
                <el-tag type="success">捐赠次数：{{ CountyMsg.countyDistributeNum }}</el-tag>
            </div>
            
            <p class="content">
                {{ countyIntroduction }}
            </p>

            <div class="button-container">
                <el-button type="primary" @click="goDistribute()">立即捐赠</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            CountyDetailList: [],
            countyId: '',
            countyImg: '',
            countyIntroduction: '',
            CountyMsg: {
                countyId: '',
                countyImg: '',
                countyIntroduction: '',
                provinceName: '',
                cityName: '',
                countyName: '',
                countyDistributeNum: '',
            },
        };
    },
    methods: {
        getCountyDetailList() {
            var countyDetailMsg = sessionStorage.getItem("DetailCountyInfo")
            countyDetailMsg = JSON.parse(countyDetailMsg)
            this.CountyMsg.provinceName = countyDetailMsg.provinceName
            this.CountyMsg.cityName = countyDetailMsg.cityName
            this.CountyMsg.countyName = countyDetailMsg.countyName
            this.CountyMsg.countyDistributeNum = countyDetailMsg.countyDistributeNum
            this.countyId = countyDetailMsg.countyId;

            this.$axios.get(
                "/county/getCountyDetailList",
                {
                    params: {
                        countyId: this.countyId
                    }
                }
            ).then(res => {
                if (res.data.code == 0) {
                    this.CountyDetailList = res.data.data;
                    // alert(JSON.stringify(this.CountyDetailList))
                    this.countyImg = this.CountyDetailList[0].countyImage;
                    this.countyIntroduction = this.CountyDetailList[0].countyIntroduction;

                } else {
                    this.$message.error('暂未有满足用户查找的地区');
                }
            }).catch(err => {
                alert("请求失败");
            });
        },
        goBack() {
            if (this.$route.path != '/PoorArea') {
                this.$router.push('/PoorArea');
            }
        },

        goDistribute(){
            if (this.$route.path != '/Distribute') {
                this.$router.push('/Distribute');
            }
        }
    },
    mounted() {
        this.getCountyDetailList();
    }
};
</script>

<style scoped>
.cardStyle {
   
    padding: 20px;
}

.content-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* 元素之间的间距 */
}



.title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
}

.content {
    font-size: 17px;
    line-height: 1.8;
}

.button-container {
    display: flex;
    justify-content: center;

}
</style>