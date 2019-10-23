
<template>
  <div id="bg">
    <transition name="fade">
      <header v-show="show">
        <span @click="History_go">
          <van-icon name="arrow-left" />
        </span>
        <abbr>城市选择</abbr>
        <span></span>
      </header>
    </transition>

    <nav class="fade_search">
      <van-search
        @input="searchInput"
        @focus="Focus"
        background
        v-model="searchVal"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
      >
        <div @click="baibai" slot="action">取消</div>
      </van-search>
    </nav>
    <!-- js自动完成 -->
    <ul v-show="Autoshow" class="autoover">
      <li v-for="item in newarr" @click="Cityn(item.nm,item.id)">{{item.nm}}</li>
    </ul>
    <!--  -->
    <section v-show="Secshow" class="con_">
      <div class="con_head">热门城市</div>

      <article class="con_hot">
        <p v-for="item in hot" @click="Cityn(item.nm,item.id)">{{item.nm}}</p>
      </article>

      <van-index-bar>
        <ul class="ul" v-for="item in arr">
          <van-index-anchor :index="item.index" />
          <li v-for="a in item.list" @click="Cityn(a.n,a.id)">{{a.n}}</li>
        </ul>
      </van-index-bar>
    </section>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "City",
  data() {
    return {
      Secshow: true,
      Autoshow: false,
      res: [],
      newarr: [],
      searchVal: "",
      show: true,
      arr: [],
      hot: [],
      citynm: ""
    };
  },
  mounted() {
    axios
      .post("http://localhost:3000/proxy", {
        url: "http://39.97.33.178/api/cityList"
      })
      .then(res => {
        var msg = res.statusText;
        if (msg === "OK") {
          console.log(res);
          var Citer = res.data.info.data.cities;
          this.res = Citer;
          // [{ index: "A", list: [{ nm: "阿城", id: 123 }] }];
          this.formatCityList(Citer);
          res.data.info.data.cities.forEach((item, index) => {
            if (item.isHot == 1) {
              this.hot.push(item);
            }
          });
        }
      });

    //头部隐藏
    let oldTop = 0; //旧数据，初始为0
    // 将自定义方法绑定到窗口滚动条事件
    window.onscroll = () => {
      let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
      //旧数据大于当前位置，表示滚动条top向上滚动
      if (oldTop < 60) {
        this.show = true;

        // console.log("↑");
      } else {
        //相反...
        this.show = false;

        // console.log("↓");
      }
      oldTop = top; //更新旧的位置
    };
  },
  methods: {
    History_go() {
      this.$router.push("/");
    },

    formatCityList(Citer) {
      var cityList = [];
      var hotList = [];
      for (var i = 0; i < Citer.length; i++) {
        var firstLetter = Citer[i].py.substring(0, 1).toUpperCase();
        if (Tocom(firstLetter)) {
          //新添加的index
          cityList.push({
            index: firstLetter,
            list: [{ n: Citer[i].nm, id: Citer[i].id }]
          });
        } else {
          //累加到已有的index
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ n: Citer[i].nm, id: Citer[i].id });
            }
          }
        }
      }

      cityList.sort((n1, n2) => {
        if (n1.index < n2.index) {
          return -1;
        } else if (n1.index > n2.index) {
          return 1;
        } else {
          return 0;
        }
      });

      function Tocom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      this.arr = cityList;
      console.log(this.arr);
    },
    Cityn(a, b) {
      localStorage.setItem("CITYID", JSON.stringify(b));
      this.$router.push({
        path: "/",
        query: {
          name: a
        }
      });
    },
    ////////http://39.97.33.178/api/searchList 搜索传城市id与searchVal
    searchInput() {
      console.log(this.searchVal);

      this.newarr = [];
      for (var i = 0; i < this.res.length; i++) {
        if (
          this.res[i].py.indexOf(this.searchVal) != -1 ||
          this.res[i].nm.indexOf(this.searchVal) != -1
        ) {
          this.newarr.push(this.res[i]);
        }
      }
    },
    // 显示与隐藏
    Focus() {
      this.Secshow = false;
      this.Autoshow = true;
    },
    // 取消
    baibai() {
      this.Secshow = true;
      this.Autoshow = false;
      this.searchVal = "";
    }
  }
};
</script>
<style scoped>
#bg {
  font-size: 0.33rem;
}
.con_ {
  padding: 0.9rem 0 0 0;
}
.con_head {
  height: 1rem;

  line-height: 1rem;
  padding-left: 0.2rem;
}
.con_hot {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  /* grid-row-gap: 0rem; */
  place-items: center;
  background: rgba(180, 177, 174, 0.1);
  height: 2rem;
}
.con_hot p {
  background: #eee;
  height: 0.5rem;
  width: 80%;
  text-align: center;
  line-height: 0.5rem;
}
/* 搜索框 */
.van-search {
  width: 100%;
  z-index: 2;
  position: fixed;
  top: 0;
  padding: 0.1rem;
  background: url(../../assets/bg_.jpg);
}

/* 列表 */
.ul {
  margin-top: 20px;
}
.ul li {
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.2rem;
  border-bottom: 1px solid rgba(93, 96, 97, 0.1);
}

header {
  z-index: 999999;
}
/* .huiding {
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.4rem;
  height: 0.4rem;
  width: 0.4rem;
  position: fixed;
  opacity: 0.5;
  right: 0.5rem;
  bottom: 0.5rem;
  background: rgb(121, 119, 117);
  border: 0.2rem solid rgba(204, 204, 202, 0.5);
  border-radius: 50%;
} */
.autoover {
  position: fixed;
  top: 1rem;
  z-index: 999;
  width: 100%;
}
.autoover li {
  line-height: 0.9rem;
  padding-left: 0.2rem;
  background: #fff;
  width: 100%;
  height: 0.9rem;
  border-bottom: 1px solid rgba(93, 96, 97, 0.1);
}
</style>
