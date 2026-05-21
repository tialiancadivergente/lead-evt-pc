import * as React from "react"

interface ScreenSize {
  width: number
  height: number
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<ScreenSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  React.useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateScreenSize()

    window.addEventListener("resize", updateScreenSize)

    return () => {
      window.removeEventListener("resize", updateScreenSize)
    }
  }, [])

  return screenSize
}
