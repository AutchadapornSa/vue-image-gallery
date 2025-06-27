<template>
  <div class="row">
    <!-- วนลูปสร้างคอลัมน์ (3 คอลัมน์) -->
    <div v-for="(column, index) in columns" :key="index" class="col-12 col-md-4">
      <!-- วนลูปแสดงรูปภาพในแต่ละคอลัมน์ -->
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

// นี่คือหัวใจของการสร้าง Layout!
// แปลง array ของรูปภาพ [img1, img2, img3, img4, ...]
// ให้กลายเป็น array ของคอลัมน์ [[img1, img4, ...], [img2, img5, ...], [img3, img6, ...]]
const columns = computed(() => {
  const result = Array.from({ length: NUM_COLUMNS }, () => []);
  
  props.images.forEach((image, index) => {
    // ใช้ Modulo (%) เพื่อกระจายรูปภาพลงในคอลัมน์
    result[index % NUM_COLUMNS].push(image);
  });

  return result;
});
</script>