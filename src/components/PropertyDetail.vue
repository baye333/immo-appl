<script setup>
import { ref, watch } from 'vue'
import { formatPrice } from '../utils.js'

const props = defineProps({ property: Object, favorite: Boolean })
const emit = defineEmits(['close', 'toggle-favorite'])
const dialog = ref(null)

watch(
  () => props.property,
  (p) => {
    if (!dialog.value) return
    if (p && !dialog.value.open) dialog.value.showModal()
    if (!p && dialog.value.open) dialog.value.close()
  }
)
</script>

<template>
  <dialog ref="dialog" class="detail" @close="emit('close')" @click.self="emit('close')">
    <div v-if="property" class="detail-inner" :style="{ '--h': property.hue }">
      <div class="detail-visual">
        <svg viewBox="0 0 120 80" aria-hidden="true">
          <path d="M10 80V46L60 12l50 34v34z" />
          <rect x="50" y="52" width="20" height="28" />
        </svg>
        <button class="close" aria-label="Fermer" @click="emit('close')">✕</button>
      </div>

      <div class="detail-body">
        <p class="price">{{ formatPrice(property) }}</p>
        <h2>{{ property.title }}</h2>
        <p class="place">{{ property.type }} · {{ property.district }}, {{ property.city }}</p>

        <dl class="specs">
          <div><dt>Surface</dt><dd>{{ property.surface }} m²</dd></div>
          <div v-if="property.rooms"><dt>Pièces</dt><dd>{{ property.rooms }}</dd></div>
          <div v-if="property.bathrooms"><dt>Salles de bain</dt><dd>{{ property.bathrooms }}</dd></div>
        </dl>

        <p class="desc">{{ property.description }}</p>

        <ul class="tags">
          <li v-for="f in property.features" :key="f">{{ f }}</li>
        </ul>

        <div class="detail-actions">
          <a class="btn" :href="`mailto:contact@immo.example?subject=${encodeURIComponent('Demande : ' + property.title)}`">
            Contacter l'agence
          </a>
          <button class="btn ghost" @click="emit('toggle-favorite')">
            {{ favorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>
