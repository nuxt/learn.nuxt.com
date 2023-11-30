<script setup lang="ts">

</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex="~ gap-2 items-center" border="b base dashed" bg-faded px4 py2>
      <div i-ph-book-duotone />
      <span text-sm>Guide</span>
    </div>
    <article class="max-w-none prose" of-auto p6>
      <ContentDoc />
    </article>
  </div>
</template>
