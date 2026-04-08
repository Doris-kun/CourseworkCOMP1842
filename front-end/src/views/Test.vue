<template>
  <div>
    <h1>Staff Training Quiz</h1>

    <!-- Start Screen -->
    <div v-if="!testStarted">
      <p>Test your knowledge on the standard Helpdesk Responses. The test covers 3 randomly selected questions.</p>
      <button class="ui button primary" @click="startTest" :disabled="issues.length === 0">
        Start Quiz
      </button>
      <div v-if="issues.length < 2" class="ui negative message">
        You need to add at least 2 helpdesk issues before you can start the multiple choice quiz!
      </div>
    </div>

    <!-- Results Screen -->
    <div v-else-if="testCompleted" class="ui center aligned segment">
      <h2 class="ui icon header">
        <i class="trophy yellow icon"></i>
        <div class="content">
          Quiz Completed!
          <div class="sub header">You answered {{ score }} out of {{ totalQuestions }} correctly.</div>
        </div>
      </h2>
      <button class="ui button primary" @click="resetTest" style="margin-top: 20px;">
        Restart Quiz
      </button>
    </div>

    <!-- Active Question Screen -->
    <div v-else-if="currentIssue">
      <div class="ui segment">
        <div class="ui top attached label teal">
          Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
        </div>
        <h3 style="margin-top: 25px;">Which of the following Issue Codes matches this response?</h3>
        <!-- Trích dẫn Response một cách nổi bật -->
        <div class="ui message info" style="margin-bottom: 25px; font-size: 1.1em; font-style: italic;">
          "{{ currentIssue.response }}"
        </div>
        
        <!-- Các nút trắc nghiệm Multiple Choice -->
        <div class="ui vertical buttons fluid">
          <button v-for="(choice, index) in currentChoices" :key="index" 
            class="ui button basic" 
            :class="{
               'blue': !isAnswered,
               'green': isAnswered && choice === currentIssue.issueCode,
               'red': isAnswered && userAnswer === choice && choice !== currentIssue.issueCode,
               'disabled': isAnswered
            }" 
            @click="submitAnswer(choice)"
            style="margin-bottom: 10px; text-align: left; padding: 15px; border-radius: 5px;">
            <i class="angle double right icon" style="margin-right: 15px;"></i>
            <strong>{{ choice }}</strong>
          </button>
        </div>
      </div>
      
      <!-- Feedback Message -->
      <div v-if="isAnswered" :class="['ui', 'message', isCorrect ? 'positive' : 'negative']">
        <div class="header">{{ isCorrect ? 'Correct!' : 'Incorrect!' }}</div>
        <p>{{ feedbackMessage }}</p>
        
        <button v-if="currentQuestionIndex + 1 < totalQuestions" class="ui button primary" @click="nextQuestion">
          Next Question <i class="arrow right icon"></i>
        </button>
        <button v-else class="ui button primary" @click="finishTest">
          Finish Test <i class="flag checkered icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'test',
  data() {
    return {
      issues: [],
      quizPool: [], 
      testStarted: false,
      testCompleted: false,
      currentQuestionIndex: 0,
      totalQuestions: 3,
      score: 0,
      
      currentIssue: null,
      currentChoices: [],
      userAnswer: '',
      feedbackMessage: '',
      isCorrect: false,
      isAnswered: false, 
    };
  },
  methods: {
    startTest() {
      if (this.issues.length >= 2) {
        // Tắt trộn cho pool câu hỏi gốc 3 câu
        let shuffled = [...this.issues].sort(() => 0.5 - Math.random());
        this.quizPool = shuffled.slice(0, Math.min(this.totalQuestions, shuffled.length));
        this.totalQuestions = this.quizPool.length;
        
        this.testStarted = true;
        this.testCompleted = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.loadQuestion();
      }
    },
    loadQuestion() {
      this.currentIssue = this.quizPool[this.currentQuestionIndex];
      this.userAnswer = '';
      this.feedbackMessage = '';
      this.isCorrect = false;
      this.isAnswered = false;
      
      // Tạo danh sách 4 phương án (1 đúng, 3 sai ngẫu nhiên)
      let wrongAnswers = this.issues.filter(i => i.issueCode !== this.currentIssue.issueCode);
      wrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      let allOptions = [...wrongAnswers, this.currentIssue];
      // Xáo trộn 4 phương án hiển thị
      this.currentChoices = allOptions.sort(() => 0.5 - Math.random()).map(i => i.issueCode);
    },
    submitAnswer(choice) {
      if (this.isAnswered) return;
      
      this.isAnswered = true;
      this.userAnswer = choice;
      
      if (choice === this.currentIssue.issueCode) {
        this.isCorrect = true;
        this.score += 1;
        this.feedbackMessage = `Excellent! You chose the correct Issue Code.`;
      } else {
        this.isCorrect = false;
        this.feedbackMessage = `Oops! The standard code for this response is actually "${this.currentIssue.issueCode}".`;
      }
    },
    nextQuestion() {
      this.currentQuestionIndex++;
      this.loadQuestion();
    },
    finishTest() {
      this.testCompleted = true;
    },
    resetTest() {
      this.startTest();
    }
  },
  async mounted() {
    this.issues = await api.getIssues();
  }
};
</script>

<style scoped>
/* Chỉnh nhẹ để tách rời các nút button bấm trắc nghiệm ra cho đẹp */
.ui.vertical.buttons .button {
  border: 1px solid #d4d4d5 !important;
  box-shadow: 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15) !important;
}
.ui.vertical.buttons .button:not(:last-child) {
  margin-bottom: 15px !important;
}
</style>
