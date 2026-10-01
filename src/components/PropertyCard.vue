<script setup>
import { formatPrice } from '../utils.js'

defineProps({ property: { type: Object, required: true }, favorite: Boolean })
defineEmits(['open', 'toggle-favorite'])
</script>

<template>
  <article class="card" :style="{ '--h': property.hue }">
    <button class="visual" :aria-label="`Voir ${property.title}`" @click="$emit('open')">
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <path d="M10 80V46L60 12l50 34v34z" />
        <rect x="50" y="52" width="20" height="28" />
      </svg>
      <span class="badge">{{ property.type }}</span>
    </button>

    <div class="card-body">
      <p class="price">{{ formatPrice(property) }}</p>
      <h3>{{ property.title }}</h3>
      <p class="place">{{ property.district }}, {{ property.city }}</p>
      <p class="facts">
        {{ property.surface }} m²<template v-if="property.rooms"> · {{ property.rooms }} pièces</template>
      </p>
    </div>

    <div class="card-actions">
      <button class="btn small" @click="$emit('open')">Voir le détail</button>
      <button
        class="fav"
        :class="{ on: favorite }"
        :aria-pressed="favorite"
        :aria-label="favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        @click="$emit('toggle-favorite')"
      >
        {{ favorite ? '★' : '☆' }}
      </button>
    </div>
  </article>
</template>
