import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameHeader from '../components/GameHeader.vue'

describe('GameHeader', () => {
  it('should render the component', () => {
    const wrapper = mount(GameHeader)
    expect(wrapper.exists()).toBe(true)
  })

  it('should display the text prop', () => {
    const testText = 'Test Header'
    const wrapper = mount(GameHeader, {
      props: {
        text: testText
      }
    })
    expect(wrapper.text()).toBe(testText)
  })

  it('should apply the size prop to font-size style', () => {
    const testSize = 50
    const wrapper = mount(GameHeader, {
      props: {
        text: 'Test',
        size: testSize
      }
    })
    const element = wrapper.find('div')
    expect(element.attributes('style')).toContain(`font-size: ${testSize}px`)
  })

  it('should handle missing text prop', () => {
    const wrapper = mount(GameHeader)
    expect(wrapper.text()).toBe('')
  })

  it('should handle missing size prop', () => {
    const wrapper = mount(GameHeader, {
      props: {
        text: 'Test'
      }
    })
    // Should render without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('should have the correct CSS classes', () => {
    const wrapper = mount(GameHeader, {
      props: {
        text: 'Test'
      }
    })
    const element = wrapper.find('div')
    expect(element.classes()).toContain('mainHeaderText')
    expect(element.classes()).toContain('relative')
    expect(element.classes()).toContain('font-bold')
  })
})
