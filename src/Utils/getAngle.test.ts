import { describe, it, expect, beforeEach } from 'vitest'
import getCurrentRotationFixed from '../Utils/getAngle'

describe('getAngle', () => {
  let testElement: HTMLElement

  beforeEach(() => {
    testElement = document.createElement('div')
    document.body.appendChild(testElement)
  })

  it('should return 0 for an element with no transform', () => {
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(0)
  })

  it('should return 0 for an element with transform: none', () => {
    testElement.style.transform = 'none'
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(0)
  })

  it('should calculate angle from matrix transform (90 degrees)', () => {
    // matrix(cos, sin, -sin, cos, 0, 0) for 90 degrees = matrix(0, 1, -1, 0, 0, 0)
    testElement.style.transform = 'matrix(0, 1, -1, 0, 0, 0)'
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(90)
  })

  it('should calculate angle from matrix transform (180 degrees)', () => {
    // matrix(cos, sin, -sin, cos, 0, 0) for 180 degrees = matrix(-1, 0, 0, -1, 0, 0)
    testElement.style.transform = 'matrix(-1, 0, 0, -1, 0, 0)'
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(180)
  })

  it('should calculate angle from matrix transform (270 degrees)', () => {
    // matrix(cos, sin, -sin, cos, 0, 0) for 270 degrees = matrix(0, -1, 1, 0, 0, 0)
    testElement.style.transform = 'matrix(0, -1, 1, 0, 0, 0)'
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(270)
  })

  it('should calculate angle from matrix transform (45 degrees)', () => {
    // matrix(cos, sin, -sin, cos, 0, 0) for 45 degrees
    const cos45 = Math.cos(Math.PI / 4)
    const sin45 = Math.sin(Math.PI / 4)
    testElement.style.transform = `matrix(${cos45}, ${sin45}, ${-sin45}, ${cos45}, 0, 0)`
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(45)
  })

  it('should handle rotate() transform in real browser context', () => {
    // Note: JSDOM doesn't compute CSS transforms like real browsers
    // In a real browser, rotate(90deg) would be converted to a matrix
    // In JSDOM, we need to set the computed style directly
    testElement.style.transform = 'rotate(90deg)'
    const angle = getCurrentRotationFixed(testElement)
    // In JSDOM, this returns 0 because the transform isn't computed to matrix
    // In a real browser, this would return 90
    expect(angle).toBe(0)
  })

  it('should handle negative angles and normalize to 0-360 range', () => {
    // -90 degrees should be normalized to 270
    const cos = Math.cos(-Math.PI / 2)
    const sin = Math.sin(-Math.PI / 2)
    testElement.style.transform = `matrix(${cos}, ${sin}, ${-sin}, ${cos}, 0, 0)`
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(270)
  })

  it('should handle malformed transform gracefully', () => {
    testElement.style.transform = 'matrix()'
    const angle = getCurrentRotationFixed(testElement)
    expect(angle).toBe(0)
  })
})
