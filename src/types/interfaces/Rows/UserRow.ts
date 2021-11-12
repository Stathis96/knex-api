import { Task } from "src/types/entities/Task";

export interface UserRow {
  id: string

  fullname: string

  email: string
  
  tasks: Task[]
}