<template>
  <div>
    <transition name="fade">
      <header v-show="show">
        <nav @click="Dizhi">{{n}}</nav>
        <nav>影院通</nav>
        <nav>55</nav>
      </header>
    </transition>

    <nav class="swiper">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../assets/bg_.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/star.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/yellow.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/me.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/qqqqq.jpg" alt />
        </van-swipe-item>
      </van-swipe>
    </nav>

    <section>
      <p class="tap_live">
        <span>热门推荐</span>
        <span style="font-size:0.28rem">
          更多
          <span>></span>
        </span>
      </p>

      <article class="hot_One">
        <figure>
          <div>
            <img src="../assets/grilfriend.jpg" alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
        <figure>
          <div>
            <img src alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
        <figure>
          <div>
            <img src alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
        <figure>
          <div>
            <img src alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
        <figure>
          <div>
            <img src alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
        <figure>
          <div>
            <img src alt />
          </div>
          <div class="two">
            <p>
              <abbr>航海王：草帽酱savsvsvsvdvd</abbr>
              <span>广州正佳演绎影院</span>
            </p>
          </div>
        </figure>
      </article>

      <p class="tap_live">
        <span>热门活动</span>
        <span style="font-size:0.28rem">
          更多
          <span>></span>
        </span>
      </p>

      <article class="hot_life">
        <figure>
          <img src="../assets/goutou.jpg" alt />
          <div>全国通用电影券兑换上线了</div>
        </figure>
        <figure>
          <img src="../assets/goutou2.jpg" alt />
          <div>全国通用电影券兑换上线了</div>
        </figure>
      </article>

      <p class="tap_live">
        <span>最新资讯</span>
        <span style="font-size:0.28rem">
          更多
          <span>></span>
        </span>
      </p>

      <article class="what_life">
        <figure>
          <div>
            <img src="../assets/goutou2.jpg" alt />
          </div>
          <div class="detail">
            <p>一次相遇，相守一生！最好的陪伴，给你最暖的行动</p>
            <p>
              <span>691</span>
              <span>0</span>
            </p>
          </div>
        </figure>
        <figure></figure>
        <figure></figure>
        <figure></figure>
        <figure></figure>
        <figure></figure>
      </article>

      <footer>院线通</footer>

      <van-tabbar v-model="activetag">
        <van-tabbar-item to="/">首页</van-tabbar-item>
        <van-tabbar-item to="/shop" icon="search">购票</van-tabbar-item>
        <van-tabbar-item to="/movie" icon="setting-o">影院</van-tabbar-item>
        <van-tabbar-item to="/wode" icon="wode">我的</van-tabbar-item>
      </van-tabbar>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      n: "",
      activetag: 0,
      show: false
    };
  },
  created() {
    const city = this.$route.query.name;
    if (this.$route.query.name != undefined) {
      localStorage.setItem("city", JSON.stringify(city));
      this.n = JSON.parse(localStorage.getItem("city"));
    } else {
      if (localStorage.getItem("city")) {
        this.n = JSON.parse(localStorage.getItem("city"));
      } else {
        this.n = "选择城市";
      }
    }
  },
  methods: {
    Dizhi() {
      this.$router.push("/city");
    }
  },

  mounted() {
    let oldTop = 0; //旧数据，初始为0
    // 将自定义方法绑定到窗口滚动条事件
    window.onscroll = () => {
      let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
      //旧数据大于当前位置，表示滚动条top向上滚动
      if (oldTop > top) {
        this.show = false;
        // console.log("↑");
      } else {
        //相反...
        this.show = true;
        // console.log("↓");
      }
      oldTop = top; //更新旧的位置
    };
  }
};
</script>
<style  scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
}
.swiper .van-swipe {
  border-radius: 0 0 0.2rem 0.2rem;
}
.swiper img {
  height: 4rem;
}
* {
  margin: 0;
}
.tap_live {
  margin: 0.4rem 0 0.3rem;
  border-left: 0.1rem solid darkmagenta;
  padding: 0 0.1rem;
  display: flex;
  justify-content: space-between;
  color: darkmagenta;
}
.hot_One {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.2rem;
}
.hot_One img {
  height: 2.8rem;
  border-radius: 0.12rem;
}
.hot_One figure {
  height: 3.9rem;

  display: grid;
  grid-template-rows: 10fr 4fr;
}
.hot_One figure .two {
  text-align: center;
}
.hot_One figure .two p {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.2rem;
  background: #fff;
}
.hot_One figure .two abbr {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: rgb(71, 68, 71);
  width: 2.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.26rem;
}
.hot_One figure .two span {
  font-family: monospace;
  color: rgb(53, 51, 51);
  font-size: 0.2rem;
  margin-top: 0.2rem;
}

.hot_life {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.3rem;
}
.hot_life figure {
  position: relative;
  background: slategrey;
}
.hot_life div {
  color: #fff;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.24rem;
  position: absolute;
  bottom: 0;
  background: rgba(22, 22, 22, 0.8);
  height: 0.44rem;
  width: 100%;
}

.what_life {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 0.2rem;
}
.what_life figure {
  height: 1.6rem;
  display: grid;
  grid-template-columns: 4.8fr 6fr;
  grid-column-gap: 0.2rem;
  background: darkblue;
}
.what_life figure div:nth-child(1) {
  height: 1.6rem;
}
.detail {
  font-size: 0.28rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.05rem;
}
.detail p:nth-child(2) {
  font-size: 0.24rem;
}

footer {
  height: 1rem;
  display: grid;
  place-items: center;
}
</style>
