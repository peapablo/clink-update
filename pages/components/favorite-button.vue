<template>
  <button class="favorite-button" @click="toggleFavorite">
    <img
      v-if="isFavorite"
      :src="activeStar"
      alt="Active Star"
    />
    <img
      v-else
      :src="inactiveStar"
      alt="Inactive Star"
    />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'pinia'; 
import { useRoute } from 'vue-router'; 

const store = useStore();
const route = useRoute(); 

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const isFavorite = computed(() => {
  const list = store.favoriteMenus[store.profile?.id] ?? [];
  return list.includes(props.path);
});

const toggleFavorite = () => {
  const favoriteMenuList = { ...store.favoriteMenus };
  const list = favoriteMenuList[store.profile?.id] ?? [];

  if (isFavorite.value) {
    const index = list.indexOf(props.path);
    list.splice(index, 1);
  } else {
    list.push(props.path);
  }

  favoriteMenuList[store.profile?.id] = list;

  
  store.setFavoritesMenus(favoriteMenuList);
};

const activeStar = '/icons/stars/active.svg';
const inactiveStar = '/icons/stars/inactive.svg';
</script>

<style scoped>
.favorite-button-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.favorite-button {
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  border-radius: 8px;
  transition: all 0.3s;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.favorite-button img {
  width: 20px;
}

.favorite-button:hover {
  background-color: #f8f9fe;
  box-shadow: 0 0 0 1px #f8f9fe;
}
</style>
