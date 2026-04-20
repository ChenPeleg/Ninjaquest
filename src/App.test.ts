import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'
import GameHeader from './components/GameHeader.vue'
import MeditationZone from './pages/MeditaionZone.vue'
import BattleZone from './pages/BattleZone.vue'
import PaintedBackGround from './components/PaintedBackGround.vue'

describe('App', () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  it('renders correctly', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct component name', () => {
    const wrapper = mount(App)
    // @ts-ignore - accessing component options
    expect(wrapper.vm.$options.name).toBe('App')
  })

  it('renders GameHeader component', () => {
    const wrapper = mount(App)
    const gameHeader = wrapper.findComponent(GameHeader)
    expect(gameHeader.exists()).toBe(true)
  })

  it('passes correct props to GameHeader', () => {
    const wrapper = mount(App)
    const gameHeader = wrapper.findComponent(GameHeader)
    expect(gameHeader.props('text')).toBe('Ninja Quest')
    expect(gameHeader.props('size')).toBe(50)
  })

  it('renders PaintedBackGround component', () => {
    const wrapper = mount(App)
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.exists()).toBe(true)
  })

  it('passes zone prop to PaintedBackGround', () => {
    const wrapper = mount(App)
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.props('zone')).toBe('medi')
  })

  it('renders MeditationZone when zone is "medi"', () => {
    const wrapper = mount(App)
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.exists()).toBe(true)
  })

  it('does not render BattleZone when zone is "medi"', () => {
    const wrapper = mount(App)
    const battleZone = wrapper.findComponent(BattleZone)
    expect(battleZone.exists()).toBe(false)
  })

  it('initializes with correct default data', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.zone).toBe('medi')
    expect(wrapper.vm.sizeOfHeader).toBe(50)
    expect(wrapper.vm.questionNumber).toBe(1)
    expect(wrapper.vm.AllQuestions).toBeDefined()
  })

  it('passes AllQuestions to MeditationZone', () => {
    const wrapper = mount(App)
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.props('AllQuestions')).toBeDefined()
    expect(meditationZone.props('AllQuestions')).toBe(wrapper.vm.AllQuestions)
  })

  it('passes questionNumber to MeditationZone', () => {
    const wrapper = mount(App)
    const meditationZone = wrapper.findComponent(MeditationZone)
    expect(meditationZone.props('questionNumber')).toBe(1)
  })

  it('increments questionNumber when nextQuestion event is emitted', async () => {
    const wrapper = mount(App)
    const meditationZone = wrapper.findComponent(MeditationZone)
    
    expect(wrapper.vm.questionNumber).toBe(1)
    
    await meditationZone.vm.$emit('nextQuestion')
    
    expect(wrapper.vm.questionNumber).toBe(2)
  })

  it('has correct main container classes', () => {
    const wrapper = mount(App)
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
    const wrapper = mount(App)
    
    wrapper.vm.zone = 'battle'
    await wrapper.vm.$nextTick()
    
    const battleZone = wrapper.findComponent(BattleZone)
    const meditationZone = wrapper.findComponent(MeditationZone)
    
    expect(battleZone.exists()).toBe(true)
    expect(meditationZone.exists()).toBe(false)
  })

  it('updates PaintedBackGround zone when zone data changes', async () => {
    const wrapper = mount(App)
    
    wrapper.vm.zone = 'battle'
    await wrapper.vm.$nextTick()
    
    const background = wrapper.findComponent(PaintedBackGround)
    expect(background.props('zone')).toBe('battle')
  })
})
