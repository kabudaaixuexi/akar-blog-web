<template>
  <div>
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
        <div class="sousuo" @click="baibai" slot="action">取消</div>
      </van-search>
    </nav>
    <section>
      <article class="now_list">
        <figure v-for="item in newList" @click="Todetail(item.id)">
          <img :src="item.image" v-lazy="item.image" alt />
          <div>
            <h4 class="list_title">
              <span>{{item.title}}</span>
              <small>{{item.wantedCount}}人想看</small>
            </h4>
            <abbr>{{item.actor1}}/{{item.actor2}}</abbr>
            <p class="list_date">今日{{item.wantedCount}}家影院上映</p>
            <nav class="list_bottom">
              <ul class="list_biao">
                <li>{{item.rYear}}年</li>
                <li>{{item.rMonth}}月</li>
                <li>{{item.rDay}}日</li>
              </ul>
            </nav>
          </div>
        </figure>
      </article>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "search",
  data() {
    return {
      searchVal: "",
      aList: [],
      newList: []
    };
  },
  computed: {
    ...mapState({
      print: state => state.print.all
    })
  },
  created() {
    this.$store.commit("Will");
  },
  mounted() {
    this.aList = this.$store.state.list.data.info.moviecomings;
    console.log(this.$store.state.list.data.info.moviecomings);
  },
  methods: {
    searchInput() {
      this.show = true;
      console.log(this.searchVal);
      this.newList = [];
      this.aList.forEach(item => {
        if (item.title.indexOf(this.searchVal) != -1) {
          this.newList.push(item);
        }
      });
    },
    Focus() {
      this.show = false;
    },
    baibai() {
      this.$router.history.go(-1);
    },
    Todetail(a) {
      this.$router.push({
        name: "detail",
        query: {
          id: a
        }
      });
    }
  }
};
</script>
 <style scoped>
.now_list figure {
  display: flex;
  padding: 0.2rem 0;
  height: 2rem;
  border-bottom: 1px solid rgba(219, 217, 217, 0.2);
}
.now_list figure img {
  height: 100%;
  width: 1.5rem;
  margin-right: 0.3rem;
}
.now_list figure div {
  width: 100%;
}

.list_title {
  display: flex;
  justify-content: space-between;
}
.list_title span {
  font-size: 0.31rem;
}
.list_title small {
  color: darkorchid;
}
.now_list div {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
}
.now_list div abbr {
  color: blueviolet;
  font-size: 0.24rem;
}
.now_list .list_date {
  font-size: 0.24rem;
  color: rgb(163, 153, 153);
}
.list_bottom {
  display: flex;
  justify-content: space-between;
}
.list_biao {
  display: flex;
  font-size: 0.2rem;
  align-items: center;
}
.list_biao li {
  color: rgb(96, 97, 99);
  display: flex;
  margin-right: 0.02rem;
  align-items: center;
  padding: 0 0.06rem;
  border: 1px solid rgb(95, 95, 97);
  border-radius: 10%;
}
</style>
