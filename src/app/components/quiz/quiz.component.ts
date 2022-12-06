import { Component, OnInit } from '@angular/core';
import quiz_questions  from '../../../assets/data/quiz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', './quiz.responsive.component.css']
})
export class QuizComponent implements OnInit {
  title: string = ''

  questions: any
  questionSelected: any

  answers: string[] = []
  resultSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  result: string = ''
  photoResult: string = ''
  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false

      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      console.log(this.answers)

    }
  }

  playerChoose(value: string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1
    if(this.questionIndex === this.questionMaxIndex){
      const result = await this.checkResult(this.answers)
      this.resultSelected = quiz_questions.results[result as keyof typeof quiz_questions.results].name
      this.photoResult = quiz_questions.results[result as keyof typeof quiz_questions.results].photo
      this.finished = true
    }else{
      this.questionSelected = this.questions[this.questionIndex]
    }

  }

  async checkResult(answers: string[]){

    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter( item => item === previous).length >
        arr.filter( item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
