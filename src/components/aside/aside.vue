<template>
  <div class="aside">
    <ul class="aside-ul">
      <li class="aside-li">
        <h4 class="title" :class="['active']" @click="onCancleActive($event)">菜单一</h4>
        <ul class="li-ul">
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
        </ul>
      </li>
      <li class="aside-li">
        <h4 class="title" @click="onCancleActive($event)">菜单一</h4>
        <ul class="li-ul hide">
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
          <li class="li-li" @click="hasActive($event)">菜单二</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "asider",
  data() {
    return {}
  },
  methods: {
    onCancleActive(e) {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        e.target.nextSibling.classList.add("hide")
        let len = e.target.nextSibling.childNodes.length
        for (let i = 0; i < len; i++) {
          if (e.target.nextSibling.childNodes[i].classList.contains("active")) {
            e.target.nextSibling.childNodes[i].classList.remove("active")
          }
        }
      } else {
        e.target.classList.add("active");
        e.target.nextSibling.classList.remove("hide")
      }
    },
    hasActive(e) {
      let liLis = document.querySelectorAll(".li-li");
      let len = liLis.length;
      for (let i = 0; i < len; i++) {
        liLis[i].classList.contains('active') && liLis[i].classList.remove('active');
      }
      e.target.classList.add('active')
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  .aside-ul {
    list-style: none;
    user-select: none;
    text-align: center;

    .aside-li {
      .title {
        margin: 0 0 5px;
        height: 30px;
        line-height: 30px;
        padding: 10px 0;
        cursor: pointer;

        &.active {
          background-color: rgb(39,174,96);
          color: #fff;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
      }

      .li-ul {
        list-style: none;
        user-select: none;
        padding: 0;

        &.hide {
          display: none;
        }

        .li-li {
          height: 40px;
          line-height: 40px;

          &.active {
            background-color: rgba(46,204,113,.8);
            color: #fff;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>