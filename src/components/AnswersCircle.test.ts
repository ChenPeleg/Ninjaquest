import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnswersCircle from './AnswersCircle.vue'
import LetterInCircle from './LetterInCircle.vue'

describe('AnswersCircle', () => {
  const mockAnswers = [
    { id: 1, image: 'image1.png' },
    { id: 2, image: 'image2.png' },
    { id: 3, image: 'image3.png' },
  ]

  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders correctly with props', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    expect(wrapper.find('#answerscircle').exists()).toBe(true)
    expect(wrapper.find('#listOfAnswers').exists()).toBe(true)
    expect(wrapper.findComponent(LetterInCircle).exists()).toBe(true)
  })

  it('renders all answers as list items', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    const items = wrapper.findAll('.item')
    expect(items).toHaveLength(mockAnswers.length)
  })

  it('applies pause class when ispaused is true', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: true,
        correctAnimation: false,
      },
    })

    const list = wrapper.find('#listOfAnswers')
    expect(list.classes()).toContain('pause')
  })

  it('does not apply pause class when ispaused is false', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    const list = wrapper.find('#listOfAnswers')
    expect(list.classes()).not.toContain('pause')
  })

  it('emits pressAnswer event when an answer is clicked', async () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    const firstItem = wrapper.find('.item')
    await firstItem.trigger('click')

    expect(wrapper.emitted('pressAnswer')).toBeTruthy()
    expect(wrapper.emitted('pressAnswer')?.[0]).toBeDefined()
  })

  it('renders images with correct src', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    const images = wrapper.findAll('img')
    images.forEach((img, index) => {
      expect(img.attributes('src')).toBe(mockAnswers[index].image)
    })
  })

  it('applies correct animation classes when correctAnimation is a number', async () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: 1,
      },
    })

    const images = wrapper.findAll('img')
    
    // First image should have correctAnimationCorrect class
    expect(images[0].classes()).toContain('correctAnimationCorrect')
    
    // Other images should have correctAnimationRemaining class
    expect(images[1].classes()).toContain('correctAnimationRemaining')
    expect(images[2].classes()).toContain('correctAnimationRemaining')
  })

  it('sets sizeOfwheel to 250 on mobile devices', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    // Wait for mounted hook to execute
    await new Promise(resolve => setTimeout(resolve, 150))

    expect(wrapper.vm.sizeOfwheel).toBe(250)
  })

  it('sets data-ansnum attribute correctly', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    const items = wrapper.findAll('.item')
    items.forEach((item, index) => {
      expect(item.attributes('data-ansnum')).toBe(mockAnswers[index].id.toString())
    })
  })

  it('initializes with correct default data values', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: false,
      },
    })

    expect(wrapper.vm.spinDuration).toBe(24)
    expect(wrapper.vm.sizeOfwheel).toBe(340)
  })

  it('passes isbright prop to LetterInCircle when correctAnimation is active', () => {
    const wrapper = mount(AnswersCircle, {
      props: {
        answers: mockAnswers,
        ispaused: false,
        correctAnimation: 2,
      },
    })

    const letterInCircle = wrapper.findComponent(LetterInCircle)
    expect(letterInCircle.props('isbright')).toBe(2)
  })
})
