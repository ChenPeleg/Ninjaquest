<template>
  <div id="meditaionzone">

    <div >
      <div>
        <div>
          <AnswersCircle
            :answers="answers"
            :ispaused="ispaused"
            :correctAnimation="correctAnimation"
            @pressAnswer="pressAnswer"
          />
        </div>
        <div>
          <MediNinja :correctAnimation="correctAnimation" />
        </div>
        <div>
          <Question>{{questionText}}</Question>
        </div>
      </div>
    </div>

    <button class="addBtn" v-on:click="addToCircle">Add 1</button>
    <button class="addBtn" v-on:click="toggleSpin">stop/ play</button>
  </div>
</template>

<script>
import AnswersCircle from "./AnswersCircle.vue";
import Question from "./Question.vue";
import MediNinja from "./MediNinja.vue";
export default {
  name: "MeditaionZone",
  props: ["AllQuestions", "questionNumber"],
  data() {
    return {
      answers: this.AllQuestions.questions[this.questionNumber].answers.map(
        o => {
          return {
            id:
              this.AllQuestions.questions[this.questionNumber].answers.indexOf(
                o
              ) + 1,
            image: this.AllQuestions.meta.baseUrl + o
          };
        }
      ),
      ispaused: false,
      correctAnimation: false
    };
  },
  components: { AnswersCircle, Question, MediNinja },
  computed: {
    questionText: function() {
      return this.AllQuestions.questions[this.questionNumber].text;
    },
    calcAnswer: function() {
      return this.AllQuestions.questions[this.questionNumber].answers.map(o => {
        return {
          id:
            this.AllQuestions.questions[this.questionNumber].answers.indexOf(
              o
            ) + 1,
          image: this.AllQuestions.meta.baseUrl + o
        };
      });
    }
  },
  mounted() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32) {
        this.rightAnswer(
          this.AllQuestions.questions[this.questionNumber].solution
        );
      }
      // for Testing purpuses
    });
  },

  methods: {
    addToCircle() {
      return;
    },
    pressAnswer(payload) {
      this.checkIgCorrect(payload);
    },
    checkIgCorrect(payload) {
      const isCorrect =
        +this.AllQuestions.questions[this.questionNumber].solution ===
        +payload.id;

      isCorrect ? this.rightAnswer(payload.id) : this.wrongAnswer(payload.id);
    },
    rightAnswer(id) {
      // this.answers = [...this.answers].filter(a => +a.id === +id);
      this.$emit("nextQuestion", { id });
      this.correctAnimation = id;
      setTimeout(() => {
        this.answers = [];
      }, 2000);
      setTimeout(() => {
        this.correctAnimation = false;
        this.answers = [...this.calcAnswer];
      }, 3000);
    },
    wrongAnswer(id) {
      this.removeFromCircle(id);
    },
    removeFromCircle(id) {
      const newAnswers = this.answers.filter(a => +a.id !== +id);
      this.answers = [...newAnswers];
    },
    toggleSpin() {
      this.ispaused = !this.ispaused;
    }
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
  @media screen and (max-width: 640px) {
    padding-left: 1px;

  }
}
.mediNinja {
  // display: inline;
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


