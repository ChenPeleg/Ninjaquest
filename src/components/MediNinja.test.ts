import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MediNinja from '../components/MediNinja.vue'

describe('MediNinja', () => {
  it('should render the component', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: false
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render the ninja image', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: false
      }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('medi-ninja.svg')
    expect(img.attributes('alt')).toBe('medi-ninja')
  })

  it('should apply medininjaGlow class when correctAnimation is true', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: true
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).toContain('medininjaGlow')
  })

  it('should not apply medininjaGlow class when correctAnimation is false', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: false
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).not.toContain('medininjaGlow')
  })

  it('should accept number for correctAnimation prop', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: 1
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).toContain('medininjaGlow')
  })

  it('should accept 0 as false for correctAnimation prop', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: 0
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).not.toContain('medininjaGlow')
  })

  it('should always have mediNinja and desaturate classes', () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: false
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).toContain('mediNinja')
    expect(img.classes()).toContain('desaturate')
  })

  it('should update classes when correctAnimation prop changes', async () => {
    const wrapper = mount(MediNinja, {
      props: {
        correctAnimation: false
      }
    })
    const img = wrapper.find('img')
    expect(img.classes()).not.toContain('medininjaGlow')

    await wrapper.setProps({ correctAnimation: true })
    expect(img.classes()).toContain('medininjaGlow')
  })
})
