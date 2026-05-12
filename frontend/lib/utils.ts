import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats ISO date strings from the API (e.g. "2024-03-01") → "March 2024"
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

// Truncates long strings for cards and previews
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

// Splits a full name into first names and surname (last word)
export function splitName(fullName: string): { firstNames: string; surname: string } {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return { firstNames: parts[0], surname: '' }
  return { firstNames: parts.slice(0, -1).join(' '), surname: parts[parts.length - 1] }
}
