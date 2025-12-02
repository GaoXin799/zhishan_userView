<template>
    <el-card class="cardStyle">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div class="content-container">
            <!-- 图片和标题显示在同一行 -->
            <p class="title">{{ JournalMsg.journalTitle }}</p>
                <img :src="JournalMsg.journalImage" alt="" height="300px" width="300px" style="margin:auto" />
                
            
            
            <p class="content">
                {{ JournalMsg.journalContent }}
            </p>
            
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
            JournalMsg: {
                journalId: '',
                journalTitle: '',
                journalImage: '',
                journalContent: '',
                journalAddTime: '',
            },
        };
    },
    methods: {
        getCountyDetailList() {
            var journalDetailMsg = sessionStorage.getItem("JournalDetailInfo")
            journalDetailMsg = JSON.parse(journalDetailMsg)
            this.JournalMsg.journalId = journalDetailMsg.journalId
            this.JournalMsg.journalImage = journalDetailMsg.journalImage
            this.JournalMsg.journalTitle = journalDetailMsg.journalTitle
            this.JournalMsg.journalContent = journalDetailMsg.journalContent
            this.JournalMsg.journalAddTime = journalDetailMsg.journalAddTime
        },
        goBack() {
            if (this.$route.path != '/Journal') {
                this.$router.push('/Journal');
            }
        },


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

.image-title-container {
    display: flex;
    
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