<template>
  <div>
    <el-card class="elCard">
      <div class="row">
        <span>省：</span>
        <el-select v-model="ProvinceList.provinceId" filterable placeholder="请选择省" class="selectStyle"
          @change="showCities(ProvinceList.provinceId)">
          <el-option v-for="province in ProvinceList" :key="province.provinceName" :label="province.provinceName"
            :value="province.provinceId" />
        </el-select>
        <span>市：</span>
        <el-select v-model="CityList.cityId" filterable placeholder="请选择市" class="selectStyle"
          @change="changeCity(CityList.cityId)">
          <el-option v-for="city in CityList" :key="city.cityName" :label="city.cityName" :value="city.cityId" />
        </el-select>

        <el-input v-model="countyName" placeholder="请输入地区关键词" class="inputStyle"></el-input>
        <el-button icon="el-icon-search" circle class="searchStyle" @click="ClickSearch()"></el-button>
      </div>

      <el-card v-for="(item, index) in SearchCountyList" :key="index" class="CountyCard">
        <!-- <img class="countyImg" src="@/utils/images/adminLoginImg1.png" alt=""> -->
        <div class="countyInfo" @click="goToCountyDetailPage(item)">
          <span class="countyNameStyle">{{ item.countyName }}</span>
          <div class="countyInfo2">
            <el-tag>{{ item.provinceName }}</el-tag>
            <el-tag type="success">{{ item.cityName }}</el-tag>
            <el-tag type="warning">捐赠次数：{{ item.countyDistributeNum }}</el-tag>
          </div>
          <div>
            <el-collapse>
              <p> {{ item.countyIntroduction | truncate(50) }}</p>
            </el-collapse>
          </div>
        </div>



      </el-card>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[3, 5]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" />

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
      ProvinceList: [
      ],
      CityList: [],
      countyName: '',
      SearchProvinceId: '',
      SearchCityId: '',
      SearchCountyList: [],
    };
  },
  methods: {

    showAllProvinces() {
      this.$axios.get(
        "/province/showAllProvinces",
        {
          params: {
          }
        }
      ).then(res => {  //业务：
        if (res.data.code == 0) {
          this.ProvinceList = res.data.data
          // console.log(this.ProvinceList)
          // alert(this.ProvinceList[0].provinceName)
        } else {
          alert("该区域暂时还没有套房")
        }

      }).catch(err => { //通讯失败或报错

      })
    },

    showCities(provinceId) {
      this.SearchProvinceId = provinceId
      this.SearchCityId = ''
      this.currentPage = 1
      this.SearchCountry()

      this.$axios.get(
        "/city/showCities",
        {
          params: {
            provinceId: provinceId
          }
        }
      ).then(res => {  //业务：
        console.log("res")
        if (res.data.code == 0) {
          this.CityList = res.data.data
          // console.log(this.ProvinceList)
          // alert(this.ProvinceList[0].provinceName)
        } else {
          alert("该区域暂时还没有套房")
        }

      }).catch(err => { //通讯失败或报错

      })
    },
    changeCity(cityId) {
      this.SearchCityId = cityId
      this.currentPage = 1
      this.SearchCountry()
    },
    handleSizeChange(val) {
      this.size = val
      this.currentPage = 1
      this.SearchCountry()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.SearchCountry()
    },
    SearchCountry() {
      this.$axios.get(
        "/county/searchCounty",
        {
          params: {
            provinceId: this.SearchProvinceId,
            cityId: this.SearchCityId,
            countyName: this.countyName,
            curr: this.currentPage,
            size: this.size,
          }
        }
      ).then(res => {  //业务：
        if (res.data.code == 0) {
          this.SearchCountyList = res.data.data
          this.totalPage = res.data.total
          // console.log(this.SearchCountyList)

        } else {
          this.$message.error('暂未有满足用户查找的地区');
        }

      }).catch(err => { //通讯失败或报错

      })


    },
    ClickSearch(){
      this.currentPage = 1
      this.SearchCountry()
    },


    goToCountyDetailPage(item){
      // alert(item.countyName)
      sessionStorage.setItem("DetailCountyInfo",JSON.stringify(item))
      if (this.$route.path != '/CountyDetailView') {
        this.$router.push('/CountyDetailView')
      }
    }


  },
  mounted() {
    this.showAllProvinces(),
    this.SearchCountry()
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
  width: 150px;
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

/* .countyImg {
  margin-top: 5px;
  width: 90px;
  height: 90px;
  float: left;
} */

.countyInfo {
  /*文字左对齐 */
  text-align: left;
}

.countyInfo2 {
  display: inline;
  padding-left: 30px;
}

.countyNameStyle {
  font-size: 21px;
  font-weight: bold;
  color: #333;
}
</style>
