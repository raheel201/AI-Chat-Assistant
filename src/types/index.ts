// Type definitions
export interface User {
  id: string
  email: string
  name: string
}

export interface Message {
  id: string
  content: string
  userId: string
  timestamp: Date
}