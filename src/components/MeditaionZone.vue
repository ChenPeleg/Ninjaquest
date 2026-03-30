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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AnswersCircle from "./AnswersCircle.vue";
import Question from "./Question.vue";
import MediNinja from "./MediNinja.vue";

interface Answer {
  id: number;
  image: string;
}

interface QuestionData {
  text: string;
  answers: string[];
  solution: string;
  type?: string;
}

interface AllQuestionsData {
  meta: {
    name: string;
    id: string;
    baseUrl: string;
  };
  questions: {
    [key: number]: QuestionData;
  };
}

export default defineComponent({
  name: "MeditaionZone",
  components: { AnswersCircle, Question, MediNinja },
  props: {
    AllQuestions: {
      type: Object as PropType<AllQuestionsData>,
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    const currentQuestion = this.AllQuestions.questions[this.questionNumber];
    return {
      answers: (currentQuestion?.answers ?? []).map((o, index) => {
        return {
          id: index + 1,
          image: this.AllQuestions.meta.baseUrl + o
        };
      }) as Answer[],
      ispaused: false as boolean,
      correctAnimation: false as boolean | number
    };
  },
  computed: {
    questionText(): string {
      return this.AllQuestions.questions[this.questionNumber]?.text ?? '';
    },
    calcAnswer(): Answer[] {
      const currentQuestion = this.AllQuestions.questions[this.questionNumber];
      return (currentQuestion?.answers ?? []).map((o, index) => {
        return {
          id: index + 1,
          image: this.AllQuestions.meta.baseUrl + o
        };
      });
    }
  },
  mounted() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        const solution = this.AllQuestions.questions[this.questionNumber]?.solution;
        if (solution) {
          this.rightAnswer(Number(solution));
        }
      }
    });
  },
  methods: {
    addToCircle() {
      // Empty method
    },
    pressAnswer(payload: { event: Event; id: number }) {
      this.checkIgCorrect(payload);
    },
    checkIgCorrect(payload: { event: Event; id: number }) {
      const solution = this.AllQuestions.questions[this.questionNumber]?.solution;
      const isCorrect = solution ? +solution === +payload.id : false;
      isCorrect ? this.rightAnswer(payload.id) : this.wrongAnswer(payload.id);
    },
    rightAnswer(id: number) {
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
    wrongAnswer(id: number) {
      this.removeFromCircle(id);
    },
    removeFromCircle(id: number) {
      const newAnswers = this.answers.filter(a => +a.id !== +id);
      this.answers = [...newAnswers];
    },
    toggleSpin() {
      this.ispaused = !this.ispaused;
    }
  }
});
</script>
