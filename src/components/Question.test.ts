import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Question from '../components/Question.vue'

describe('Question', () => {
  it('should render the component', () => {
    const wrapper = mount(Question)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render slot content', () => {
    const slotContent = 'What is your favorite color?'
    const wrapper = mount(Question, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.text()).toContain(slotContent)
  })

  it('should render the scroll image', () => {
    const wrapper = mount(Question)
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('scroll.svg')
  })

  it('should have correct CSS classes', () => {
    const wrapper = mount(Question)
    const questionDiv = wrapper.find('.question')
    expect(questionDiv.exists()).toBe(true)
    expect(questionDiv.classes()).toContain('relative')
  })

  it('should render question text with correct styling', () => {
    const wrapper = mount(Question, {
      slots: {
        default: 'Test Question'
      }
    })
    const questionText = wrapper.find('.question-text')
    expect(questionText.exists()).toBe(true)
    expect(questionText.classes()).toContain('font-bold')
    expect(questionText.classes()).toContain('absolute')
  })

  it('should handle empty slot', () => {
    const wrapper = mount(Question)
    expect(wrapper.exists()).toBe(true)
    const questionText = wrapper.find('.question-text')
    expect(questionText.text()).toBe('')
  })

  it('should render HTML content in slot', () => {
    const wrapper = mount(Question, {
      slots: {
        default: '<strong>Bold Question</strong>'
      }
    })
    const questionText = wrapper.find('.question-text')
    expect(questionText.html()).toContain('<strong>Bold Question</strong>')
  })
})
