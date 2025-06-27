<template>
  <div class="container my-4">
    <header class="text-center mb-4">
      <h1 class="display-4">Vue Image Gallery</h1>
      <p class="lead">Column Layout, Infinite Scroll, and Live Search</p>
    </header>

    <main>
      <SearchBar v-model="searchTerm" @clear="clearSearch" />

      <!-- ใช้ ImageGallery Component ใหม่ของเรา -->
      <ImageGallery :images="images" @tag-clicked="handleTagClick" />

      <!-- Loading Indicator & Observer (เหมือนเดิม) -->
      <div ref="observerEl" class="text-center p-5">
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="!hasMore && images.length > 0" class="text-muted">No more images to load.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
// Script ทั้งหมดเหมือนกับเวอร์ชันก่อนหน้า ไม่ต้องแก้ไขอะไรเลย!
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { fetchImages } from './services/imageService.js';
import ImageGallery from './components/ImageGallery.vue'; // <-- ใช้ Component ใหม่
import SearchBar from './components/SearchBar.vue';

const images = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);
const searchTerm = ref('');
const observerEl = ref(null);
let observer = null;
let debounceTimer = null;

const resetAndLoad = () => {
  images.value = [];
  currentPage.value = 1;
  hasMore.value = true;
  loadMoreImages();
};

const loadMoreImages = async () => {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  try {
    const response = await fetchImages({
      page: currentPage.value,
      searchTerm: searchTerm.value
    });
    images.value.push(...response.data);
    hasMore.value = response.hasMore;
    currentPage.value++;
  } catch (error) {
    console.error("Failed to fetch images:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleTagClick = (tag) => {
  searchTerm.value = tag;
};

const clearSearch = () => {
  searchTerm.value = '';
};

watch(searchTerm, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    resetAndLoad();
  }, 300);
});

onMounted(() => {
  resetAndLoad();
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreImages();
      }
    },
    { rootMargin: '200px' }
  );
  if (observerEl.value) {
    observer.observe(observerEl.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  clearTimeout(debounceTimer);
});
</script>