// src/services/imageService.js

const masterData = [];
// สร้างข้อมูลตามรูปตัวอย่าง
const sampleLayoutData = [
  { tags: ['keyword_a', 'keyword_b'], h: 400 },
  { tags: ['keyword_b', 'keyword_c'], h: 300 },
  { tags: ['keyword_a', 'keyword_b'], h: 350 },
  { tags: ['keyword_c', 'keyword_e'], h: 400 },
  { tags: ['keyword_a', 'keyword_b'], h: 500 },
  { tags: ['keyword_b', 'keyword_c'], h: 450 },
  { tags: ['keyword_c', 'keyword_e'], h: 600 },
  { tags: ['keyword_b', 'keyword_c'], h: 300 },
  { tags: ['keyword_a', 'keyword_d'], h: 400 },
  { tags: ['keyword_c', 'keyword_d'], h: 550 },
  { tags: ['keyword_e', 'keyword_d'], h: 350 },
];

const generateMockData = () => {
    if (masterData.length > 0) return;

    sampleLayoutData.forEach((item, index) => {
        masterData.push({
            id: index + 1,
            imageUrl: `https://placehold.co/400x${item.h}/EEE/31343C`,
            tags: item.tags,
        });
    });

    for (let i = masterData.length; i < 200; i++) {
        const height = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
        const randomTags = ['keyword_a', 'keyword_b', 'keyword_c', 'keyword_d', 'keyword_e']
            .sort(() => 0.5 - Math.random()).slice(0, 2);
        masterData.push({
            id: i + 1,
            imageUrl: `https://placehold.co/400x${height}/EEE/31343C`,
            tags: randomTags,
        });
    }
};

generateMockData();

export const fetchImages = async ({ page = 1, limit = 20, searchTerm = '' }) => {
    let filteredData = masterData;
    if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredData = masterData.filter(image => 
            image.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
        );
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: paginatedData,
                hasMore: endIndex < filteredData.length
            });
        }, 300);
    });
};