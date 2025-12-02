<template>
    <div>
        <el-card class="elCard">
            <div class="row">
                <el-input v-model="searchMsg" placeholder="请输入想要搜索的新闻内容" class="inputStyle"></el-input>
                <el-button icon="el-icon-search" circle class="searchStyle" @click="ClickSearch()"></el-button>
            </div>

            <el-card v-for="(item, index) in JournalList" :key="index" class="CountyCard" >
                <img class="journalImg" :src="item.journalImage" alt="" @click="goToJournalDetail(item)">
                <div class="journalInfo" @click="goToJournalDetail(item)">
                    <span class="countyNameStyle">{{ item.journalTitle }}</span>
                    <span class="timeStyle">发布时间：{{ item.journalAddTime}}</span>
                    <div>
                        <el-collapse>
                            <p> {{ item.journalContent | truncate(50) }}</p>
                        </el-collapse>
                    </div>
                </div>



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
            currentPage: 1,
            size: this.size,
            totalPage: 1,
            JournalList: [],
            searchMsg: '',
        };
    },
    methods: {

        handleSizeChange(val) {
            this.size = val
            this.currentPage = 1
            this.SearchJournalList()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.SearchJournalList()
        },
        SearchJournalList() {
            this.$axios.get(
                "/journal/getJournalList",
                {
                    params: {
                        journalTitle: this.searchMsg,
                        curr: this.currentPage,
                        size: this.size,
                    }
                }
            ).then(res => {  //业务：
                if (res.data.code == 0) {
                    this.JournalList = res.data.data
                    this.totalPage = res.data.total

                } else {
                    this.$message.error('暂未有满足用户查找的新闻');
                }

            }).catch(err => { 

            })

        },
        ClickSearch() {
            this.currentPage = 1
            this.SearchJournalList()
        },
        goToJournalDetail(item){
            sessionStorage.setItem("JournalDetailInfo",JSON.stringify(item))
            if (this.$route.path != '/JournalDetail') {
                this.$router.push('/JournalDetail')
            }
        },


    },
    mounted() {
        this.SearchJournalList()
    },
    filters: {
        truncate: function (value, length) {
            if (!value) return '';
            return value.length > length ? value.substring(0, length) + '......' : value;
        }
    }
};
</script>

<style scoped>
.row {
    display: flex;
    align-items: center;
}

.selectStyle {
    margin-right: 10px;
    /* 减少右侧间距 */
    width: 120px;
    /* 调整宽度 */
}

.inputStyle {
    margin-right: 10px;
    /* 减少右侧间距 */
    width: 170px;
    /* 调整宽度 */
}

.searchStyle {
    margin-left: 0;
    /* 移除左侧间距 */
}

.elCard {
    height: 700px;
}

/* 搜索县列表样式 */
.CountyCard {
    margin-bottom: 10px;
    height: 110px;
}

.journalImg {
    margin-top: -10px;
    width: 90px;
    height: 90px;
    float: left;
  }

.journalInfo {
    /*文字左对齐 */
    text-align: left;
}


.countyNameStyle {
    font-size: 21px;
    font-weight: bold;
    color: #333;
}
.timeStyle{
    margin-left: 550px;
}
</style>