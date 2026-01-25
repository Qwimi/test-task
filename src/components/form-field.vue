<template>
    <label class="form-field">
        <p class="form-field__label" v-show="slots.label || label">
            <slot name="label">{{ label }}</slot>
        </p>
        <div class="form-field__input-row">
            <span class="form-field__icon" v-show="slots['prepend-icon']">
                <slot name="prepend-icon">
                </slot>
            </span>
            <input v-model.trim="model" :type="type" :placeholder="placeholder" class=" form-field__input">
            <span class="form-field__icon" v-show="slots['append-icon']">
                <slot name="append-icon"></slot>
            </span>
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    type: 'text' | 'number'
    min?: number
    max?: number
    placeholder?: string
    label?: string
}>()

const slots = defineSlots<{
    label: Node[],
    'prepend-icon': Node[],
    'append-icon': Node[],
}>()

const model = defineModel()

// ToDo: реализовать валидацию
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

    &__input {
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