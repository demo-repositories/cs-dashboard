import { unstable_defineService } from "sanity/dashboard"

export default unstable_defineService('worker', ({service}) => {
  const interval = setInterval(() => {
    console.warn(`${service.name} is running`)
  }, 10_000)
  
  return () => clearInterval(interval)
})