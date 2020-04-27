<template>
  <div class="letterincircle letterFade">{{currentLetter}}</div>
</template>

<script>
export default {
  name: "LetterInCircle",
  //components: {}
  //props: {}
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
  opacity: 0.2;
  font-family: "MaShanZheng";
  font-weight: 300;
  font-size: 120px;
  position: absolute;
  // left: 0%;
  top: 17%;
  text-align: center;
  z-index: -1;
}
.letterFade {
  animation: letterFade 10s infinite;
}
@keyframes letterFade {
  0% {
    color: rgba(224, 22, 22, 0.959);
    text-shadow: -6px 6px wheat;
  }
  20% {
    color: rgba(158, 160, 130, 0.3);
    text-shadow: 14px -12px 3px rgba(238, 255, 4, 0.883);
  }
  40% {
    color: rgba(241, 226, 13, 0.411);
    text-shadow: 4px 4px 3px rgba(12, 12, 11, 0.322);
  }
  60% {
    color: rgba(135, 170, 53, 0.116);
    text-shadow: -4px 4px 3px rgba(238, 255, 0, 0.322);
  }
  80% {
    color: rgba(216, 120, 120, 0.096);
    text-shadow: 10px -4px 3px rgba(238, 255, 0, 0.722),
      11px -5px 3px rgba(23, 235, 41, 0.722),
      13px -6px 3px rgba(255, 14, 14, 0.877);
  }
  100% {
    color: rgba(228, 68, 68, 0.596);
    text-shadow: 4px 9px 3px rgba(238, 255, 0, 0.322);
  }
}
</style>