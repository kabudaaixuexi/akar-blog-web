<template>
  <div id="app">
    <header>
      <span>
        <span @click="History_go">
          <van-icon name="arrow-left" />
        </span>
      </span>
      <span>发表评论</span>
      <span @click="MyOpinion">发表</span>
    </header>
    <article class="star">
      <van-rate
        @change="Chick(value)"
        v-model="value"
        allow-half
        void-icon="star"
        void-color="#eee"
      />
      <p>{{Pinf}}</p>
    </article>
    <article class="Text">
      <textarea placeholder="我想说..." v-model="textvalue">{{textvalue}}</textarea>
    </article>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      textvalue: "",
      value: 2.5,
      Pinf: ""
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("key")) != undefined) {
      this.Pinf = JSON.parse(localStorage.getItem("key"));
    } else {
      this.Pinf = "请打分";
    }

    if (JSON.parse(localStorage.getItem("value")) != undefined) {
      this.value = JSON.parse(localStorage.getItem("value"));
    } else {
      this.value = 4;
    }
  },
  methods: {
    Chick(value) {
      switch (value) {
        case 0.5:
        case 1:
          this.Pinf = value * 2 + ".0" + "超烂啊！";
          break;
        case 1.5:
        case 2:
          this.Pinf = value * 2 + ".0" + "比较差";
          break;
        case 2.5:
        case 3:
          this.Pinf = value * 2 + ".0" + "一般般";
          break;
        case 3.5:
        case 4:
          this.Pinf = value * 2 + ".0" + "比较好";
          break;
        case 4.5:
        case 5:
          this.Pinf = value * 2 + ".0" + "完美";
          break;
      }
      localStorage.setItem("key", JSON.stringify(this.Pinf));
      localStorage.setItem("value", JSON.stringify(this.value));
    },
    History_go() {
      var Id = JSON.parse(localStorage.getItem("ID"));
      console.log(Id);
      this.$router.push({
        name: "detail",
        query: {
          id: Id
        }
      });
    },
    MyOpinion() {
      var date = new Date();
      //发表评论 {img:"",nickname:"",date:"",content:""}
      console.log(this.textvalue);
      const id = this.$route.query.id;
      const pinglun = JSON.parse(localStorage.getItem(id));
      const Newp = [
        {
          aid: Date.now(),
          img: "",
          nickname: "刘德华",
          date: date,
          content: this.textvalue
        }
      ];
      const pinglun1 = Newp.concat(pinglun);
      localStorage.setItem(id, JSON.stringify(pinglun1));

      //结束
      var Id = JSON.parse(localStorage.getItem("ID"));
      Toast.success("操作成功");
      this.$router.push({
        name: "detail",
        query: {
          id: Id
        }
      });
    }
  }
};
</script>
<style  scoped>
#app {
  height: 100%;
  background: rgba(209, 206, 206, 0.2);
}
.star {
  height: 2rem;
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
}
.star p {
  font-size: 0.5rem;
  color: rgb(221, 200, 11);
}
.Text textarea {
  margin-top: 0.5rem;
  background: #fff;
  width: 100%;
  min-height: 2rem;
  border: none;
}

textarea::-webkit-input-placeholder {
  color: rgb(169, 173, 162);
  font-size: 0.35rem;
  text-indent: 0.1rem;
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(169, 173, 162);
  font-size: 0.35rem;
  text-indent: 0.1rem;
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(169, 173, 162);
  font-size: 0.35rem;
  text-indent: 0.1rem;
}
textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(169, 173, 162);
  font-size: 0.35rem;
  text-indent: 0.1rem;
}
</style>
