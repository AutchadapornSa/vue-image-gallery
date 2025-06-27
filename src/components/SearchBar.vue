<template>
  <div class="input-group mb-4 shadow-sm">
    <span class="input-group-text bg-white border-end-0">
      <i class="bi bi-search"></i>
    </span>
    <input 
      type="text" 
      class="form-control border-start-0" 
      placeholder="Search by tag (e.g., keyword_a, keyword_b...)"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <button v-if="modelValue" @click="$emit('clear')" class="btn btn-outline-secondary">
      Clear
    </button>
  </div>
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue', 'clear']);
</script>