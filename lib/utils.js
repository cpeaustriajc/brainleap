import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}
