export default defineNuxtRouteMiddleware((to) => {
  // You can also use `import.meta` to check environment
  if (!window?.localStorage)
    return

  const isSignedIn = JSON.parse(window.localStorage.getItem('isSignedIn') || 'false')

  if (!isSignedIn && to.path !== '/') {
    return navigateTo('/')
  }
  else {
    return true
  }
})
