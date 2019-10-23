<template>
  <div id="bg">
    <header>
      <span @click="History_go">
        <van-icon name="arrow-left" />
      </span>
      <span>影院通</span>
      <span></span>
    </header>

    <article class="video">
      <video
        :src="videoSrc?videoSrc:videoSrc2"
        autoplay="autoplay"
        controls="controls"
        width="100%"
        :poster="posterSrc"
      >
        <p>不支持播放</p>
      </video>
    </article>

    <figure class="Title">
      <div class="z">
        <img :src="img" alt />
      </div>
      <div class="x">
        <p class="x_titie">
          <b>{{basic.name}}</b>
          <span>{{basic.overallRating}}</span>
        </p>
        <p class="qian">
          <span>{{basic.isIMAX==true?"Max":'中国巨幕'}}</span>
          <span>{{basic.isIMAX3D==true?'3D':'2D'}}</span>
        </p>
      </div>
      <div class="v">
        <p>{{basic.mins}}-{{basic.releaseArea}}</p>
        <p>
          <span v-for="item in basic.type">{{item}}/</span>
        </p>
        <p>{{basic.releaseDate.substring(0,4)}}-{{basic.releaseDate.substring(4,6)}}-{{basic.releaseDate.substring(6,8)}}</p>
      </div>
    </figure>
    <section>
      <article>
        <span class="head">
          剧情介绍:
          <span class="JUqing">&nbsp;&nbsp;{{story}}</span>
        </span>
        <span></span>
      </article>
      <article>
        <p>
          <span class="head">
            导演：
            <span class="JUqing">{{basic.director.name}}</span>
          </span>
        </p>
        <p>
          <span class="head">
            主演：
            <span class="JUqing" v-for="item in basic.actors">{{item.name}}&nbsp;</span>
          </span>
        </p>
      </article>
      <article>
        <p class="secphoto">
          <span>{{basic.stageImg.list.length}}&nbsp;张图片</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </p>
        <nav class="secimg">
          <img v-for="item in basic.stageImg.list" :src="item.imgUrl" alt />
        </nav>
      </article>

      <footer class="pinglun">
        <div>网友评论（{{Pinglun.length}}）</div>
        <article v-for="item in Pinglun">
          <p class="pl_list_top">
            <img :src="item.headImg" alt />
            <span>
              {{item.nickname}}
              <br />
              <small>2019-10-18</small>
            </span>
          </p>
          <p class="pl_list_bottom">{{item.content}}</p>
        </article>
      </footer>
    </section>

    <div class="footer">
      <p @click="Go_Ping">写评论</p>
      <p>为它评分</p>
      <button>选座购票</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: "",
      id: "",
      videoSrc: "",
      videoSrc2: "https://p5-v1.xpccdn.com/040448520_main_xl.mp4",
      posterSrc: "",
      story: "",
      basic: {
        releaseDate: "",
        director: {
          name: ""
        },
        actors: {
          name: ""
        },
        stageImg: {
          list: ""
        }
      },
      Pinglun: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    localStorage.setItem("ID", JSON.stringify(this.id));
    var str = localStorage.getItem("ID");
    var obj = JSON.parse(str);
    console.log(obj);

    axios
      .post("http://localhost:3000/proxy", {
        url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=${obj}`
      })
      .then(res => {
        console.log(res);

        const data = res.data.info.data;
        const zy = data.actors;
        this.basic = data.basic;
        this.img = data.basic.img;
        this.videoSrc = data.basic.video.url;
        this.posterSrc = data.basic.video.img;
        this.story = data.basic.story;
        console.log(this.basic, this.img, this.videoSrc);
      });

    axios
      .post("http://localhost:3000/proxy", {
        url: `https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=${obj}`
      })
      .then(res => {
        if (res.statusText === "OK") {
          console.log(res);

          this.Pinglun = res.data.info.data.mini.list;
        }
      });
  },
  methods: {
    History_go() {
      this.$router.push("/shop/now");
    },
    Go_Ping() {
      this.$router.push("/myping");
    }
  }
};
</script>
<style  scoped>
/* video::-webkit-media-controls-fullscreen-button {
  display: block;
}
audio::-webkit-media-controls-play-button,
video::-webkit-media-controls-play-button {
} */
#bg {
  width: 100%;
  height: 100%;
  /* background: url(../../assets/yellow.jpg); */
}
.video {
  /* position: fixed; */
  padding-top: 0.9rem;
  height: 4rem;
  width: 100%;
}

.Title {
  position: absolute;
  top: 4.8rem;
  height: 3rem;
  display: grid;
  grid-template-columns: 3fr 7fr;
  grid-template-rows: 5fr 4fr;
  grid-template-areas:
    "z x"
    "z v";
}
.z {
  grid-area: z;
  background: seashell;
}
.z img {
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 5px #888888;
  border: 0.05rem solid rgba(94, 89, 80, 0.5);
  box-sizing: border-box;
}
.x {
  color: #fff;
  /* background: rgba(20, 20, 20, 0.5); */
  grid-area: x;
  padding: 0.4rem 0.3rem 0.2rem 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.x::before {
  background: url(../../assets/deeppink.jpg);
  opacity: 0.8;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.x_titie {
  display: flex;
  justify-content: space-between;
}
.x_titie span {
  margin-top: 0.2rem;
  font-size: 0.26rem;
  text-align: center;
  line-height: 0.35rem;
  height: 0.35rem;
  width: 0.6rem;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #291e36),
    color-stop(0%, #442d5e),
    color-stop(50%, #b4a4c5),
    color-stop(0%, #574270),
    color-stop(100%, #512c74)
  );
}
.x b {
  font-size: 0.32rem;
}
.v {
  font-family: Arial, Helvetica, sans-serif;
  grid-area: v;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  font-size: 0.22rem;
  padding: 0.2rem;
  color: rgb(70, 65, 65);
}
.qian span {
  width: 0.5rem;
  margin-left: 0.08rem;
  padding: 0 0.1rem;
  border: 1px solid #fff;
  border-radius: 10%;
  font-size: 0.24rem;
}
.JUqing {
  color: #111111;
}
section {
  box-sizing: border-box;
  width: 100%;
  padding: 3rem 0.2rem 0;
}
section article {
  line-height: 0.36rem;
  padding: 0.22rem;
  background: #fff;
  font-size: 0.25rem;
  margin: 0.15rem 0;
}
section article .head {
  color: rgb(121, 123, 124);
}
section article .secphoto {
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  margin-bottom: 0.35rem;
}
.secimg {
  display: flex;
  overflow: auto;
}
.secimg img {
  height: 1.5rem;
  margin-left: 0.2rem;
}
.pinglun {
  margin: 0.2rem;
  margin-bottom: 1rem;
}
.pl_list_top {
  display: flex;
  align-items: center;
}
.pl_list_top small {
  color: rgb(170, 173, 173);
}
.pl_list_top img {
  border-radius: 50%;
  width: 0.7rem;
  height: 0.7rem;
  display: block;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
.pl_list_bottom {
  padding: 0.1rem 0;
}

.footer {
  align-items: center;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #edeaf0),
    color-stop(0%, #a05386),
    color-stop(50%, #e990d3),
    color-stop(0%, #9d74cc),
    color-stop(100%, #f1eef5)
  );
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  padding-left: 0.2rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 1rem;
  border-top: 0.02rem solid rgba(37, 33, 33, 0.5);
}
.footer p {
  color: #eee;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 5%;
  height: 0.7rem;
  width: 90%;
  background: rgba(99, 17, 88, 0.8);
}

.footer button {
  border: none;
  color: #eee;
  font-size: 0.34rem;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #2b2a2c),
    color-stop(0%, #442d5e),
    color-stop(50%, #7b7c79),
    color-stop(0%, #715c8b),
    color-stop(100%, #5a585c)
  );
}
</style>
