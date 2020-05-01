<template>
  <div class="letterincircle letterFade" :class="{bright: isbright}">{{currentLetter}}</div>
</template>

<script>
export default {
  name: "LetterInCircle",
  //components: {}
  props: ["isbright"],
  computed: {
    currentLetter: function() {
      const l = this.letters.length - 4;
      const num = Math.abs(Math.floor(Math.random() * l));

      // return "春夏\n秋冬";
      return (
        this.letters.substr(num, 2) + "\n" + this.letters.substr(num + 2, 2)
      );
    }
  },
  data: () => {
    return {
      letters:
        "春夏秋冬东南西星黑白红橙黄绿蓝靛紫食住衣行育乐忠孝仁爱信义和平子曰父母兄弟夫妇君臣马牛羊鸡犬豕喜怒哀惧恶手足见闻声贝车雨赤青言语鱼鸟羽电以何俱伦仪先光入具初则匏协去友同名善器严执孟孙学宜容专师席常幼序从性恩恭情惰应成所才扬择教敬数文断方于族昔时智曾有朋本杼某梨机次欲此岁温为燕玄玉琢畜当相知石祖礼稷稻谷穷窦竹粱紊丝纲习老者而能自至与苟菽处融亲调识让贵身近运过道远迁邻长非革音顺饲养首香高麦黍龄思源谷歌",
      unUsed:
        "目耳口二三四五六七八九十百千万上中下左右大小少山不乃之乎人北金木水火土天地日月"
    };
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "MaShanZheng";
  src: url("../assets/fonts/MaShanZheng-Regular.ttf");
}

.letterincircle {
  opacity: 0.1;
  font-family: "MaShanZheng";
  font-weight: 300;
  font-size: 120px;
  position: absolute;
  transition: opacity ease-in-out 1s;
  top: 17%;
  text-align: center;
  z-index: -1;
}
.letterFade {
  animation: letterFade 10s infinite;
}
.bright {
  opacity: 1;
}
@keyframes letterFade {
  0% {
    color: rgba(224, 22, 22, 0.959);
    text-shadow: -6px 6px wheat, 2px -2px 5px rgb(238, 255, 4),
      2px -2px 10px rgb(238, 255, 4), 2px -2px 15px rgb(238, 255, 4);
  }
  20% {
    color: rgba(111, 5, 172, 0.226);
    text-shadow: 14px -12px 3px rgba(255, 12, 4, 0.883),
      2px -2px 30px rgb(238, 255, 4), 2px -2px 5px rgb(238, 255, 4),
      2px -2px 10px rgb(238, 255, 4), 2px -2px 15px rgb(238, 255, 4);
  }
  40% {
    color: rgba(9, 167, 173, 0.788);
    text-shadow: 4px 4px 3px rgba(15, 15, 15, 0.856),
      2px -2px 5px rgb(238, 255, 4), 2px -2px 10px rgb(238, 255, 4),
      2px -2px 15px rgb(238, 255, 4);
  }
  60% {
    color: rgba(19, 3, 250, 0.349);
    text-shadow: -4px 4px 3px rgba(81, 255, 0, 0.959),
      2px -2px 5px rgb(238, 255, 4), 2px -2px 10px rgb(238, 255, 4),
      2px -2px 15px rgb(238, 255, 4);
  }
  80% {
    color: rgb(110, 5, 102);
    text-shadow: 12px 4px 3px rgba(15, 143, 143, 0.863),
      11px -5px 3px rgba(2, 255, 23, 0.722),
      13px -6px 3px rgba(192, 22, 22, 0.486), 2px -2px 5px rgb(238, 255, 4),
      2px -2px 10px rgb(238, 255, 4), 2px -2px 15px rgb(238, 255, 4);
  }
  90% {
    color: rgba(245, 17, 17, 0.877);
    text-shadow: 4px 9px 3px rgba(238, 255, 0, 0.322),
      2px -2px 5px rgb(238, 255, 4), 2px -2px 10px rgb(238, 255, 4),
      2px -2px 15px rgb(238, 255, 4);
  }

  100% {
    color: rgba(224, 22, 22, 0.959);
    text-shadow: -6px 6px wheat, 2px -2px 5px rgb(238, 255, 4),
      2px -2px 10px rgb(238, 255, 4), 2px -2px 15px rgb(238, 255, 4);
  }
}
</style>