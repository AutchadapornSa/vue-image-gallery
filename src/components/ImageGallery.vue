<template>
  <div class="row">
    <div v-for="(column, index) in columns" :key="index" class="col-12 col-md-4">
      <div v-for="image in column" :key="image.id" class="mb-4">
        <ImageCard :image="image" @tag-clicked="$emit('tag-clicked', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ImageCard from './ImageCard.vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

defineEmits(['tag-clicked']);

const NUM_COLUMNS = 3;

const columns = computed(() => {
  const result = Array.from({ length: NUM_COLUMNS }, () => []);
  
  props.images.forEach((image, index) => {
    result[index % NUM_COLUMNS].push(image);
  });

  return result;
});
</script>