import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LetterInCircle from '../components/LetterInCircle.vue'

describe('LetterInCircle', () => {
  it('should render the component', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should apply opacity-100 class when isbright is true', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const element = wrapper.find('div')
    expect(element.classes()).toContain('opacity-100')
  })

  it('should not apply opacity-100 class when isbright is false', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: false
      }
    })
    const element = wrapper.find('div')
    expect(element.classes()).not.toContain('opacity-100')
  })

  it('should accept number for isbright prop', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: 1
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should display a letter from the letters string', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const text = wrapper.text()
    // Should have some text content
    expect(text.length).toBeGreaterThan(0)
  })

  it('should generate currentLetter with 4 characters (2 + newline + 2)', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const vm = wrapper.vm as any
    const currentLetter = vm.currentLetter
    // Should be 4 characters (2 Chinese chars + \n + 2 Chinese chars)
    const parts = currentLetter.split('\n')
    expect(parts).toHaveLength(2)
    expect(parts[0].length).toBe(2)
    expect(parts[1].length).toBe(2)
  })

  it('should select letters from the letters data', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const vm = wrapper.vm as any
    const currentLetter = vm.currentLetter
    const letters = vm.letters

    // Extract the characters without newline
    const selectedChars = currentLetter.replace('\n', '')

    // Each character should be in the letters string
    for (const char of selectedChars) {
      expect(letters).toContain(char)
    }
  })

  it('should have consistent computed property behavior', () => {
    // Mock Math.random to get predictable results
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const vm = wrapper.vm as any
    const firstCall = vm.currentLetter

    // Reset and call again with same random value
    randomSpy.mockReturnValue(0.5)
    const secondCall = vm.currentLetter

    expect(firstCall).toBe(secondCall)

    randomSpy.mockRestore()
  })

  it('should have letterFade class for animation', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const element = wrapper.find('div')
    expect(element.classes()).toContain('letterFade')
  })

  it('should have correct positioning classes', () => {
    const wrapper = mount(LetterInCircle, {
      props: {
        isbright: true
      }
    })
    const element = wrapper.find('div')
    expect(element.classes()).toContain('absolute')
    expect(element.classes()).toContain('text-center')
  })
})
