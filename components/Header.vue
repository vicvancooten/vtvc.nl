<template>
  <header class="main">
    <h1>Vic van Cooten</h1>
    <NuxtImg
      src="/me.jpg"
      :width="80"
      :height="80"
      :placeholder="[50, 25, 75, 5]"
      class="rounded"
      alt="Vic van Cooten"
    />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;

  .rounded {
    margin-bottom: 1rem;
  }

  h1 {
    font-weight: 400;
    font-size: 3.5rem;
    margin: 0;
    padding: 0;
    cursor: default;
    flex: 1;
    color: var(--accent-color);
    text-align: center;
  }
}
</style>
