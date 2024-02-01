---
ogImage: true
---

# Reactivity Part 1

Vue provides [a great reactivity system](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) that tracks changes to the data and triggers updates automatically, allowing you have your UI always up-to-date with the data. Vue's reactivity comes with a few primitives: `ref`, `reactive`, `computed` and `watch`.

- [`ref()`](https://vuejs.org/api/reactivity-core.html#ref) creates a container to hold a single value, that can be tracked automatically when the value changes. Value can be accessed or updated via `.value` property.

- [`computed()`](https://vuejs.org/api/reactivity-core.html#computed) takes a getter function and returns a `ref` object, that reflects the return value of the getter function.

Here in the playground, we created a ref object `count` to hold a number, a computed object `double` that calculates the double of `count`. Vue will smartly know that `double` depends on `count`, so whenever `count` changes, `double` will re-calculate automatically.

Try click the button to increase the `count` value - you will see the value of `double` also reflects the change.

::note
**Note**: Refs will be [auto unwrapped by Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state-1) when referenced in the `<template>`, `.value` is only needed when accessing the ref in `<script>` or JavaScript outside of Vue components.
::

## Challenge

Now let's get our hands on it! Try to modify the code, make the multiplier also reactively updatable (current hard-coded as `2`).

To do that, you can:

1. Create a variable `multiplier` with `ref()` and set it to `2`
2. Rename `double` to `result` in both the `<script>` and `<template>`
3. Update the implementation of `result` to return `count.value * multiplier.value`{lang=js}
4. Add another button to increase the `multiplier` value

That's it! Now when you click the multiplier button, you will see the result get changed with the new multiplier.

If you get stuck, you can check the solution by clicking the button below, or on the top-right corner of the editor.

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

Feel free to play more to explore your ideas! Once you are done, let's move on to the next section to learn a bit more about the reactivity system.
