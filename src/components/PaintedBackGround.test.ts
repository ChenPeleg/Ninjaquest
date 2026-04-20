import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaintedBackGround from './PaintedBackGround.vue'

describe('PaintedBackGround', () => {
  it('renders meditation zone background when zone is "medi"', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'medi',
      },
    })

    const meditationImg = wrapper.find('img[alt="forest"]')
    expect(meditationImg.exists()).toBe(true)
    expect(meditationImg.attributes('src')).toContain('bgninjafin128.svg')
  })

  it('renders battle zone background when zone is "battle"', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'battle',
      },
    })

    const battleImg = wrapper.find('img[alt="cave"]')
    expect(battleImg.exists()).toBe(true)
    expect(battleImg.attributes('src')).toContain('cave.svg')
  })

  it('does not render meditation background when zone is "battle"', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'battle',
      },
    })

    const meditationImg = wrapper.find('img[alt="forest"]')
    expect(meditationImg.exists()).toBe(false)
  })

  it('does not render battle background when zone is "medi"', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'medi',
      },
    })

    const battleImg = wrapper.find('img[alt="cave"]')
    expect(battleImg.exists()).toBe(false)
  })

  it('has staticFocus class on the main div', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'medi',
      },
    })

    const mainDiv = wrapper.find('.staticFocus')
    expect(mainDiv.exists()).toBe(true)
    expect(mainDiv.classes()).toContain('absolute')
    expect(mainDiv.classes()).toContain('top-0')
    expect(mainDiv.classes()).toContain('h-full')
  })

  it('meditation image has correct classes', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'medi',
      },
    })

    const meditationImg = wrapper.find('img[alt="forest"]')
    expect(meditationImg.classes()).toContain('relative')
    expect(meditationImg.classes()).toContain('h-full')
    expect(meditationImg.classes()).toContain('object-cover')
  })

  it('battle image has correct classes', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'battle',
      },
    })

    const battleImg = wrapper.find('img[alt="cave"]')
    expect(battleImg.classes()).toContain('relative')
    expect(battleImg.classes()).toContain('h-[160%]')
  })

  it('requires zone prop', () => {
    const wrapper = mount(PaintedBackGround, {
      props: {
        zone: 'medi',
      },
    })

    // @ts-ignore - accessing component options
    const zoneProps = wrapper.vm.$options.props?.zone
    expect(zoneProps?.required).toBe(true)
    expect(zoneProps?.type).toBe(String)
  })
})
