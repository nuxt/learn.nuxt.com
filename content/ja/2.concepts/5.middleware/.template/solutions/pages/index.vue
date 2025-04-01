<script lang="ts" setup>
function setIsSignedIn() {
  window.localStorage.setItem('isSignedIn', JSON.stringify(true))
}

function removeIsSignedIn() {
  window.localStorage.removeItem('isSignedIn')
}
</script>

<template>
  <h1>Index</h1>
  <NuxtLink to="/foo">
    /Foo
  </NuxtLink>

  <div>
    <button type="button" @click="setIsSignedIn">
      Set isSignedIn
    </button>

    <button type="button" @click="removeIsSignedIn">
      Remove isSignedIn
    </button>
  </div>
</template>
