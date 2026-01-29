<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal-fade" @click.self="closeModal" v-show="isOpen">
        <div class="modal">
          <slot name="default" :closeModal="closeModal"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isOpen = defineModel({ default: false })

const closeModal = () => (isOpen.value = false)

defineSlots<{
  default(props: { closeModal: () => void }): Node
}>()
</script>

<style lang="scss" scoped>
.modal {
  border-radius: 15px;
  background: $color-white;
  padding: 20px;
}

.modal-fade {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($color: $color-black, $alpha: 0.5);
}
</style>
