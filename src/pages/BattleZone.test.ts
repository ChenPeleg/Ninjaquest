import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleZone from './BattleZone.vue'

describe('BattleZone', () => {
  it('renders correctly', () => {
    const wrapper = mount(BattleZone)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays "battlezone" text', () => {
    const wrapper = mount(BattleZone)
    expect(wrapper.text()).toBe('battlezone')
  })

  it('has correct component name', () => {
    const wrapper = mount(BattleZone)
    // @ts-ignore - accessing component options
    expect(wrapper.vm.$options.name).toBe('BattleZone')
  })

  it('renders a div element', () => {
    const wrapper = mount(BattleZone)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('is a valid Vue component', () => {
    const wrapper = mount(BattleZone)
    expect(wrapper.vm).toBeTruthy()
  })
})
