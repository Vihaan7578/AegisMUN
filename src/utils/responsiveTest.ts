import { detectPlatform, PlatformInfo } from './platformDetection'

export interface ResponsiveTestResult {
  testName: string
  passed: boolean
  message: string
  platform: PlatformInfo
}

export const runResponsiveTests = (): ResponsiveTestResult[] => {
  const platform = detectPlatform()
  const results: ResponsiveTestResult[] = []

  // Test 1: Viewport Meta Tag
  results.push({
    testName: 'Viewport Meta Tag',
    passed: document.querySelector('meta[name="viewport"]') !== null,
    message: 'Viewport meta tag should be present for mobile optimization',
    platform
  })

  // Test 2: Touch Support Detection
  results.push({
    testName: 'Touch Support Detection',
    passed: platform.hasTouchSupport === ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    message: 'Touch support should be correctly detected',
    platform
  })

  // Test 3: Platform Detection
  results.push({
    testName: 'Platform Detection',
    passed: (platform.isIOS || platform.isAndroid || platform.isDesktop),
    message: 'Platform should be correctly identified',
    platform
  })

  // Test 4: Safe Area Support
  const rootStyles = getComputedStyle(document.documentElement)
  const hasSafeAreaSupport = rootStyles.getPropertyValue('--sat') !== '' || 
                            CSS.supports('padding', 'env(safe-area-inset-top)')
  results.push({
    testName: 'Safe Area Support',
    passed: hasSafeAreaSupport,
    message: 'Safe area insets should be supported for devices with notches',
    platform
  })

  // Test 5: Mobile Font Size
  if (platform.isMobile) {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')
    const hasCorrectFontSize = Array.from(inputs).every(input => {
      const computedStyle = getComputedStyle(input as Element)
      const fontSize = parseFloat(computedStyle.fontSize)
      return fontSize >= 16 // Prevents zoom on focus
    })
    
    results.push({
      testName: 'Mobile Input Font Size',
      passed: hasCorrectFontSize,
      message: 'Input fields should have 16px+ font size to prevent zoom on mobile',
      platform
    })
  }

  // Test 6: Touch Target Size
  const buttons = document.querySelectorAll('button, a[role="button"], .btn')
  const hasCorrectTouchTargets = Array.from(buttons).every(button => {
    const rect = button.getBoundingClientRect()
    return rect.height >= 44 && rect.width >= 44 // Apple's recommended 44px minimum
  })
  
  results.push({
    testName: 'Touch Target Size',
    passed: hasCorrectTouchTargets,
    message: 'Touch targets should be at least 44x44px for accessibility',
    platform
  })

  // Test 7: Dynamic Viewport Height (iOS Safari fix)
  if (platform.isMobile) {
    const hasDynamicViewport = document.querySelector('.min-h-\\[100dvh\\]') !== null
    results.push({
      testName: 'Dynamic Viewport Height',
      passed: hasDynamicViewport,
      message: 'Should use dynamic viewport height (100dvh) for mobile browsers',
      platform
    })
  }

  // Test 8: Platform Classes Applied
  const bodyClasses = document.body.className || document.documentElement.className
  const hasPlatformClasses = (
    (platform.isMobile && bodyClasses.includes('platform-mobile')) ||
    (platform.isIOS && bodyClasses.includes('platform-ios')) ||
    (platform.isAndroid && bodyClasses.includes('platform-android')) ||
    (platform.isDesktop && bodyClasses.includes('platform-desktop'))
  )
  
  results.push({
    testName: 'Platform Classes',
    passed: hasPlatformClasses,
    message: 'Platform-specific CSS classes should be applied to document',
    platform
  })

  return results
}

export const logResponsiveTestResults = (): void => {
  const results = runResponsiveTests()
  const passedTests = results.filter(r => r.passed).length
  const totalTests = results.length
  
  console.group('🎯 Responsive Design Test Results')
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`)
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌'
    console.log(`${icon} ${result.testName}: ${result.message}`)
  })
  
  console.log('\n📱 Platform Info:')
  console.table(results[0].platform)
  console.groupEnd()
}

// Auto-run tests in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(logResponsiveTestResults, 1000) // Wait a bit for React to render
    })
  } else {
    setTimeout(logResponsiveTestResults, 1000)
  }
} 