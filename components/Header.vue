<template>
  <header class="main">
    <h1>Vic van Cooten</h1>
    <NuxtImg
      src="/me.jpg"
      :blur="10"
      :width="80"
      :height="80"
      :sizes="'80px'"
      :formats="['webp']"
      class="me"
      alt="Vic van Cooten"
    />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;

  .me {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin: 0 1rem;
    background-color: var(--accent-color);
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
