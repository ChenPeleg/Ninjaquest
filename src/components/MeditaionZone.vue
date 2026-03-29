<template>
  <div id="meditaionzone" class="relative w-[98%]  text-left z-20">

    <div class="  flex flex-row flex-wrap gap-6">

      <div class="flex flex-row lg:pl-22.5  pl-10 ">
        <AnswersCircle
            :answers="answers"
            :ispaused="ispaused"
            :correctAnimation="correctAnimation"
            @pressAnswer="pressAnswer"
        />
        <div class="  max-w-44  flex flex-col justify-end gap-4">
          <MediNinja :correctAnimation="correctAnimation"/>
        </div>
      </div>

      <div>
        <Question>{{ questionText }}</Question>
      </div>

    </div>

    <button
        class="p-[10px] relative right-0 m-[10px] bg-[burlywood] border-0 rounded hover:shadow-[2px_2px_4px_2px_rgba(15,15,15,0.5)]"
        v-on:click="addToCircle">Add 1
    </button>
    <button
        class="p-[10px] relative right-0 m-[10px] bg-[burlywood] border-0 rounded hover:shadow-[2px_2px_4px_2px_rgba(15,15,15,0.5)]"
        v-on:click="toggleSpin">stop/ play
    </button>
  </div>
</template>

<script>
import AnswersCircle from "./AnswersCircle.vue";
import Question from "./Question.vue";
import MediNinja from "./MediNinja.vue";

export default {
  name: "MeditaionZone", props: ["AllQuestions", "questionNumber"], data() {
    return {
      answers: this.AllQuestions.questions[this.questionNumber].answers.map(o => {
        return {
          id: this.AllQuestions.questions[this.questionNumber].answers.indexOf(o) + 1,
          image: this.AllQuestions.meta.baseUrl + o
        };
      }), ispaused: false, correctAnimation: false
    };
  }, components: {AnswersCircle, Question, MediNinja}, computed: {
    questionText: function () {
      return this.AllQuestions.questions[this.questionNumber].text;
    }, calcAnswer: function () {
      return this.AllQuestions.questions[this.questionNumber].answers.map(o => {
        return {
          id: this.AllQuestions.questions[this.questionNumber].answers.indexOf(o) + 1,
          image: this.AllQuestions.meta.baseUrl + o
        };
      });
    }
  }, mounted() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 32) {
        this.rightAnswer(this.AllQuestions.questions[this.questionNumber].solution);
      }
      // for Testing purpuses
    });
  },

  methods: {
    addToCircle() {

    }, pressAnswer(payload) {
      this.checkIgCorrect(payload);
    }, checkIgCorrect(payload) {
      const isCorrect = +this.AllQuestions.questions[this.questionNumber].solution === +payload.id;

      isCorrect ? this.rightAnswer(payload.id) : this.wrongAnswer(payload.id);
    }, rightAnswer(id) {
      // this.answers = [...this.answers].filter(a => +a.id === +id);
      this.$emit("nextQuestion", {id});
      this.correctAnimation = id;
      setTimeout(() => {
        this.answers = [];
      }, 2000);
      setTimeout(() => {
        this.correctAnimation = false;
        this.answers = [...this.calcAnswer];
      }, 3000);
    }, wrongAnswer(id) {
      this.removeFromCircle(id);
    }, removeFromCircle(id) {
      const newAnswers = this.answers.filter(a => +a.id !== +id);
      this.answers = [...newAnswers];
    }, toggleSpin() {
      this.ispaused = !this.ispaused;
    }
  }

  //components: {}
  //props: {}
};
</script>
