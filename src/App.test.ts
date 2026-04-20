import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import App from './App.vue'
import GameHeader from './components/GameHeader.vue'
import MeditationZone from './pages/MeditaionZone.vue'
import BattleZone from './pages/BattleZone.vue'
import PaintedBackGround from './components/PaintedBackGround.vue'

describe('App', () => {
  let wrapper: VueWrapper | null = null

  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(async () => {
    if (wrapper) {
      wrapper.unmount()
      wrapper = null
    }
    // Allow any pending timers to complete
    await new Promise(resolve => setTimeout(resolve, 200))
  })

  it('renders correctly', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct component name', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    // @ts-ignore - accessing component options
    expect(wrapper.vm.$options.name).toBe('App')
  })

  it('renders GameHeader component', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const gameHeader = wrapper.findComponent(GameHeader)
    expect(gameHeader.exists()).toBe(true)
  })

  it('passes correct props to GameHeader', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const gameHeader = wrapper.findComponent(GameHeader)
    expect(gameHeader.props('text')).toBe('Ninja Quest')
    expect(gameHeader.props('size')).toBe(50)
  })

  it('renders PaintedBackGround component', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.exists()).toBe(true)
  })

  it('passes zone prop to PaintedBackGround', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.props('zone')).toBe('medi')
  })

  it('renders MeditationZone when zone is "medi"', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.exists()).toBe(true)
  })

  it('does not render BattleZone when zone is "medi"', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const battleZone = wrapper.findComponent(BattleZone)
    expect(battleZone.exists()).toBe(false)
  })

  it('initializes with correct default data', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(wrapper.vm.zone).toBe('medi')
    expect(wrapper.vm.sizeOfHeader).toBe(50)
    expect(wrapper.vm.questionNumber).toBe(1)
    expect(wrapper.vm.AllQuestions).toBeDefined()
  })

  it('passes AllQuestions to MeditationZone', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.props('AllQuestions')).toBeDefined()
    expect(meditationZone.props('AllQuestions')).toBe(wrapper.vm.AllQuestions)
  })

  it('passes questionNumber to MeditationZone', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.props('questionNumber')).toBe(1)
  })

  it('increments questionNumber when nextQuestion event is emitted', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const meditationZone = wrapper.findComponent(MeditationZone)
    
    expect(wrapper.vm.questionNumber).toBe(1)
    
    await meditationZone.vm.$emit('nextQuestion')
    
    expect(wrapper.vm.questionNumber).toBe(2)
  })

  it('has correct main container classes', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    const appDiv = wrapper.find('#app')
    
    expect(appDiv.exists()).toBe(true)
    expect(appDiv.classes()).toContain('absolute')
    expect(appDiv.classes()).toContain('h-full')
    expect(appDiv.classes()).toContain('w-full')
    expect(appDiv.classes()).toContain('m-0')
    expect(appDiv.classes()).toContain('p-0')
    expect(appDiv.classes()).toContain('overflow-hidden')
  })

  it('renders BattleZone when zone is changed to "battle"', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    
    wrapper.vm.zone = 'battle'
    await wrapper.vm.$nextTick()
    
    const battleZone = wrapper.findComponent(BattleZone)
    const meditationZone = wrapper.findComponent(MeditationZone)
    
    expect(battleZone.exists()).toBe(true)
    expect(meditationZone.exists()).toBe(false)
  })

  it('updates PaintedBackGround zone when zone data changes', async () => {
    wrapper = mount(App)
    await new Promise(resolve => setTimeout(resolve, 150))
    
    wrapper.vm.zone = 'battle'
    await wrapper.vm.$nextTick()
    
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.props('zone')).toBe('battle')
  })
})
