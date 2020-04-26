<template>
  <div id="meditaionzone">
    <table>
      <tr>
        <td>
          <AnswersCircle :answers="answers" :ispaused="ispaused" />
        </td>
        <td>
          <img class="mediNinja" src="../assets/images/medi-ninja.svg" alt="medi-ninja" />
        </td>
        <td>
          <Question />
        </td>
      </tr>
    </table>

    <button class="addBtn" v-on:click="addToCircle">Add 1</button>
    <button class="addBtn" v-on:click="toggleSpin">stop/ play</button>
  </div>
</template>

<script>
import AnswersCircle from "./AnswersCircle";
import Question from "./Question";

export default {
  name: "MeditaionZone",
  data() {
    return {
      storedAnswers: [9, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8].map(e => {
        return { ki: `ans${e}`, image: `ans/avt (${e}).svg` };
      }),
      // 2, 3, 4, 5, 6, 7, 8
      answers: [1, 2].map(e => {
        return { ki: `ans${e}`, image: `ans/avt (${e}).svg` };
      }),
      ispaused: false
    };
  },
  components: { AnswersCircle, Question },

  methods: {
    addToCircle() {
      if (this.storedAnswers.length) {
        const returned = this.storedAnswers.pop();
        this.answers.push(returned);
        const arrayPosition = this.answers.length;
        setTimeout(() => {
          this.updateAnswersCircle(arrayPosition);
        }, 1);
      } else {
        alert("no more");
      }
    },
    removeFromCircle(event) {
      const key = event.target.dataset.ansnum;
      const removed = this.answers.splice(key, 1);
      this.storedAnswers.push(removed);
      setTimeout(() => this.updateAnswersCircle(), 2);
    },
    toggleSpin() {
      this.ispaused = !this.ispaused;
    },

    updateAnswersCircle() {}
  }

  //components: {}
  //props: {}
};
</script>

<style lang="scss" scoped>
#meditaionzone {
  position: relative;
  width: 98%;
  padding-left: 90px;
  text-align: left;
  z-index: 20;
}
.mediNinja {
  display: inline;
  position: relative;
  height: 150px;
  bottom: -160px;
  margin: 0px;
}

.addBtn {
  padding: 10px;
  position: relative;

  right: 0px;
  margin: 10px;
  background-color: burlywood;
  border: 0px;
  border-radius: 4px;
}
.addBtn:hover {
  box-shadow: 2px 2px 4px 2px rgba(15, 15, 15, 0.5);
}

/* new try */
</style>


