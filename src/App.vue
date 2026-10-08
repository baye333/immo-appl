<script setup>
import { ref, computed, watch } from 'vue'
import { properties } from './data/properties.js'
import FilterBar from './components/FilterBar.vue'
import PropertyCard from './components/PropertyCard.vue'
import PropertyDetail from './components/PropertyDetail.vue'

const filters = ref({ q: '', mode: 'vente', type: '', maxPrice: '', minRooms: 0 })
const sort = ref('recent')
const selected = ref(null)

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem('immo-favorites') || '[]')
  } catch {
    return []
  }
}
const favorites = ref(loadFavorites())
watch(
  favorites,
  (value) => {
    try {
      localStorage.setItem('immo-favorites', JSON.stringify(value))
    } catch {
      /* stockage indisponible : on ignore */
    }
  },
  { deep: true }
)

function toggleFavorite(id) {
  favorites.value = favorites.value.includes(id)
    ? favorites.value.filter((f) => f !== id)
    : [...favorites.value, id]
}

const results = computed(() => {
  const { q, mode, type, maxPrice, minRooms } = filters.value
  const query = q.trim().toLowerCase()
  const list = properties.filter((p) => {
    if (p.mode !== mode) return false
    if (type && p.type !== type) return false
    if (maxPrice && p.price > Number(maxPrice)) return false
    if (minRooms && p.rooms < minRooms) return false
    if (query) {
      const haystack = `${p.title} ${p.city} ${p.district}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
  const sorters = {
    recent: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    surface: (a, b) => b.surface - a.surface
  }
  return [...list].sort(sorters[sort.value])
})

function resetFilters() {
  filters.value = { q: '', mode: filters.value.mode, type: '', maxPrice: '', minRooms: 0 }
}
</script>

<template>
  <header class="site-header">
    <h1 class="brand">Immo</h1>
    <p class="tagline">Trouvez un logement à acheter ou à louer au sein de votre quartier......</p>
  </header>

  <main class="layout">
    <FilterBar v-model="filters" @reset="resetFilters" />

    <section class="results" aria-live="polite">
      <div class="results-head">
        <h2>{{ results.length }} {{ results.length > 1 ? 'biens' : 'bien' }}
          {{ filters.mode === 'vente' ? 'à vendre' : 'à louer' }}</h2>
        <label class="sort">
          Trier par
          <select v-model="sort">
            <option value="recent">Plus récents</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="priceDesc">Prix décroissant</option>
            <option value="surface">Surface décroissante</option>
          </select>
        </label>
      </div>

      <div v-if="results.length" class="grid">
        <PropertyCard
          v-for="p in results"
          :key="p.id"
          :property="p"
          :favorite="favorites.includes(p.id)"
          @open="selected = p"
          @toggle-favorite="toggleFavorite(p.id)"
        />
      </div>

      <div v-else class="empty">
        <p>Aucun bien ne correspond à ces critères.</p>
        <button class="btn" @click="resetFilters">Effacer les filtres</button>
      </div>
    </section>
  </main>

  <PropertyDetail
    :property="selected"
    :favorite="selected ? favorites.includes(selected.id) : false"
    @close="selected = null"
    @toggle-favorite="selected && toggleFavorite(selected.id)"
  />
</template>
