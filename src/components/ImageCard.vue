<template>
  <div class="card border-0 shadow-sm">
    <img :src="image.imageUrl" class="card-img-top" alt="Placeholder Image">
    <div class="card-body p-2">
      <span 
        v-for="tag in image.tags" 
        :key="tag" 
        @click="$emit('tag-clicked', tag)"
        class="badge text-bg-secondary me-1 mb-1"
        style="cursor: pointer;"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({ image: Object });
defineEmits(['tag-clicked']);
</script>