<template>
  <header class="container">
    <nav class="navigation">
      <RouterLink to="/" class="navigation__link">
        Задача 1
      </RouterLink>
      <RouterLink to="/pie-chart" class="navigation__link">
        Задача 2
      </RouterLink>
    </nav>
  </header>
  <main class="page-content">
    <Transition name="fade" mode="out-in">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid $color-light-gray;
  padding-top: 40px;

  &__link {
    padding: 12px 24px;
    text-decoration: none;
    color: $color-dark-gray;
    transition: color $animation-duration-fast,
      background-color $animation-duration-fast;


    &:hover {
      color: $color-black;
      background: rgba($color: $color-light-gray, $alpha: .3);
    }
  }
}

.page-content {
  padding-block: 40px;
}
</style>