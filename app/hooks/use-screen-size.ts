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
    // Função para atualizar o tamanho da tela
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Atualizar o tamanho inicial
    updateScreenSize()

    // Adicionar listener para mudanças de tamanho
    window.addEventListener("resize", updateScreenSize)

    // Cleanup: remover listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", updateScreenSize)
    }
  }, [])

  return screenSize
}
