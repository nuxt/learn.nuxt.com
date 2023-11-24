<script setup lang="ts">

</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex="~ gap-2 items-center" px4 py2 border="b base dashed" bg-faded>
      <div i-ph-book-duotone />
      <span text-sm>Guide</span>
    </div>
    <article class="p6 prose">
      <ContentDoc />
    </article>
  </div>
</template>
