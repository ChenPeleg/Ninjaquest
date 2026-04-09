import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MeditaionZone from './MeditaionZone.vue'

// Mock child components
vi.mock('../components/AnswersCircle.vue', () => ({
  default: {
    name: 'AnswersCircle',
    template: '<div class="answers-circle-mock"></div>',
    props: ['answers', 'ispaused', 'correctAnimation']
  }
}))

vi.mock('../components/Question.vue', () => ({
  default: {
    name: 'Question',
    template: '<div class="question-mock"><slot /></div>'
  }
}))

vi.mock('../components/MediNinja.vue', () => ({
  default: {
    name: 'MediNinja',
    template: '<div class="medi-ninja-mock"></div>',
    props: ['correctAnimation']
  }
}))

describe('MeditaionZone', () => {
  const mockAllQuestions = {
    meta: {
      name: 'Test Questions',
      id: 'test-1',
      baseUrl: '/images/'
    },
    questions: {
      1: {
        text: 'What animal is this?',
        answers: ['cat.jpg', 'dog.jpg', 'bird.jpg'],
        solution: '2'
      },
      2: {
        text: 'Which is a mammal?',
        answers: ['fish.jpg', 'whale.jpg', 'snake.jpg'],
        solution: '2'
      }
    }
  }

  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(MeditaionZone, {
      props: {
        AllQuestions: mockAllQuestions,
        questionNumber: 1
      }
    })
  })

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the question text', () => {
    expect(wrapper.text()).toContain('What animal is this?')
  })

  it('should initialize answers from question data', () => {
    const vm = wrapper.vm
    expect(vm.answers).toHaveLength(3)
    expect(vm.answers[0]).toEqual({
      id: 1,
      image: '/images/cat.jpg'
    })
    expect(vm.answers[1]).toEqual({
      id: 2,
      image: '/images/dog.jpg'
    })
    expect(vm.answers[2]).toEqual({
      id: 3,
      image: '/images/bird.jpg'
    })
  })

  it('should compute questionText correctly', () => {
    const vm = wrapper.vm
    expect(vm.questionText).toBe('What animal is this?')
  })

  it('should compute calcAnswer correctly', () => {
    const vm = wrapper.vm
    const calcAnswer = vm.calcAnswer
    expect(calcAnswer).toHaveLength(3)
    expect(calcAnswer[0].image).toBe('/images/cat.jpg')
  })

  it('should toggle spin state', () => {
    const vm = wrapper.vm
    expect(vm.ispaused).toBe(false)

    vm.toggleSpin()
    expect(vm.ispaused).toBe(true)

    vm.toggleSpin()
    expect(vm.ispaused).toBe(false)
  })

  it('should remove answer from circle', () => {
    const vm = wrapper.vm
    const initialLength = vm.answers.length

    vm.removeFromCircle(2)

    expect(vm.answers).toHaveLength(initialLength - 1)
    expect(vm.answers.find((a: any) => a.id === 2)).toBeUndefined()
  })

  it('should handle wrong answer by removing it', () => {
    const vm = wrapper.vm
    const initialLength = vm.answers.length

    vm.wrongAnswer(1)

    expect(vm.answers).toHaveLength(initialLength - 1)
    expect(vm.answers.find((a: any) => a.id === 1)).toBeUndefined()
  })

  it('should handle right answer and emit nextQuestion', () => {
    const vm = wrapper.vm

    vm.rightAnswer(2)

    // Check that nextQuestion event was emitted
    const emitted = wrapper.emitted('nextQuestion')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]).toEqual([{ id: 2 }])

    // Check that correctAnimation is set
    expect(vm.correctAnimation).toBe(2)
  })

  it('should check if answer is correct', () => {
    const vm = wrapper.vm
    const payload = { event: new Event('click'), id: 2 }

    vm.checkIgCorrect(payload)

    // Should emit nextQuestion for correct answer (solution is '2')
    const emitted = wrapper.emitted('nextQuestion')
    expect(emitted).toBeTruthy()
  })

  it('should check if answer is incorrect', () => {
    const vm = wrapper.vm
    const initialLength = vm.answers.length
    const payload = { event: new Event('click'), id: 1 }

    vm.checkIgCorrect(payload)

    // Should remove wrong answer
    expect(vm.answers).toHaveLength(initialLength - 1)
    expect(wrapper.emitted('nextQuestion')).toBeFalsy()
  })

  it('should handle pressAnswer by calling checkIgCorrect', () => {
    const vm = wrapper.vm
    const checkSpy = vi.spyOn(vm, 'checkIgCorrect')
    const payload = { event: new Event('click'), id: 2 }

    vm.pressAnswer(payload)

    expect(checkSpy).toHaveBeenCalledWith(payload)
  })

  it('should update question text when questionNumber prop changes', async () => {
    await wrapper.setProps({ questionNumber: 2 })

    const vm = wrapper.vm
    expect(vm.questionText).toBe('Which is a mammal?')
  })

  it('should handle right answer with timers', async () => {
    vi.useFakeTimers()
    const vm = wrapper.vm
    const initialAnswers = [...vm.answers]

    vm.rightAnswer(2)

    // Initially correctAnimation should be set
    expect(vm.correctAnimation).toBe(2)

    // After 2 seconds, answers should be cleared
    vi.advanceTimersByTime(2000)
    expect(vm.answers).toEqual([])

    // After 3 seconds total, answers should be restored and animation should be false
    vi.advanceTimersByTime(1000)
    expect(vm.correctAnimation).toBe(false)
    expect(vm.answers.length).toBe(initialAnswers.length)

    vi.useRealTimers()
  })

  it('should handle missing question data gracefully', async () => {
    await wrapper.setProps({ questionNumber: 999 })

    const vm = wrapper.vm
    expect(vm.questionText).toBe('')
  })

  it('should initialize with ispaused as false', () => {
    const vm = wrapper.vm
    expect(vm.ispaused).toBe(false)
  })

  it('should initialize with correctAnimation as false', () => {
    const vm = wrapper.vm
    expect(vm.correctAnimation).toBe(false)
  })

  it('should render toggle spin button', () => {
    const buttons = wrapper.findAll('button')
    const toggleButton = buttons.find(btn => btn.text().includes('stop/ play'))
    expect(toggleButton).toBeTruthy()
  })

  it('should call toggleSpin when button is clicked', async () => {
    const vm = wrapper.vm
    const toggleSpy = vi.spyOn(vm, 'toggleSpin')

    const buttons = wrapper.findAll('button')
    const toggleButton = buttons.find(btn => btn.text().includes('stop/ play'))

    await toggleButton?.trigger('click')

    expect(toggleSpy).toHaveBeenCalled()
  })
})
