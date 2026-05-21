import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleScroll() {
  setTimeout(() => {
    const element = document.getElementById("hero")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      console.error("Elemento com id 'cadastro' não encontrado")
    }
  }, 100)
}
