<template>
    <label class="form-field">
        <p v-show="$slots.label" class="form-field__label">
            <slot name="label" />
        </p>

        <div class="form-field__input-row">

            <span class="form-field__icon" v-show="slots['prepend-icon']">
                <slot name="prepend-icon" />
            </span>

            <slot />

            <span class="form-field__icon" v-show="slots['append-icon']">
                <slot name="append-icon" />
            </span>
        </div>
    </label>
</template>

<script setup lang="ts">
const slots = defineSlots<{
    label: Node[],
    'prepend-icon': Node[],
    'append-icon': Node[],
}>()
</script>

<style lang="scss" scoped>
.form-field {
    border-radius: 10px;
    border: 1px solid $color-light-gray;
    background: $color-white;
    display: flex;
    padding: 10px 20px;
    flex-direction: column;
    align-items: stretch;

    &__label {
        color: $color-gray;
        font-size: 12px;
        line-height: 16px;
    }

    &__input-row {
        display: flex;
        gap: 5px;
        font-size: 16px;
        line-height: 24px;
        align-items: center;
    }

    :deep(.form-field__input) {
        outline: none;
        border: 0;
        flex: 1;
        color: $color-dark-gray;
        font-size: inherit;
        line-height: inherit;

        &::placeholder {
            color: $color-gray;
        }
    }

    &__icon {
        color: $color-gray;
    }
}
</style>