
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => {
    // Default to undefined during SSR
    if (typeof window === "undefined") return false
    // Initial check based on window size
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler function for media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    // Handler for window resize as fallback
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    setIsMobile(mql.matches)
    
    // Add event listeners
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      window.addEventListener("resize", handleResize)
    }
    
    // Clean up
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange)
      } else {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return isMobile
}
