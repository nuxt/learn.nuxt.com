import { data } from './index'

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id)
  const todo = data.find(item => item.id === id)
  return todo
})
