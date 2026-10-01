<script setup>
import { propertyTypes } from '../data/properties.js'

const filters = defineModel({ type: Object, required: true })
defineEmits(['reset'])
</script>

<template>
  <aside class="filters" aria-label="Filtres">
    <div class="segmented" role="group" aria-label="Type d'annonce">
      <button :class="{ on: filters.mode === 'vente' }" @click="filters.mode = 'vente'">Acheter</button>
      <button :class="{ on: filters.mode === 'location' }" @click="filters.mode = 'location'">Louer</button>
    </div>

    <label class="field">
      Recherche
      <input v-model="filters.q" type="search" placeholder="Ville, quartier, mot-clé" />
    </label>

    <label class="field">
      Type de bien
      <select v-model="filters.type">
        <option value="">Tous</option>
        <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
      </select>
    </label>

    <label class="field">
      Budget maximum (FCFA)
      <input v-model="filters.maxPrice" type="number" min="0" step="10000" inputmode="numeric" placeholder="Sans limite" />
    </label>

    <label class="field">
      Pièces minimum
      <select v-model.number="filters.minRooms">
        <option :value="0">Indifférent</option>
        <option :value="1">1 et plus</option>
        <option :value="2">2 et plus</option>
        <option :value="3">3 et plus</option>
        <option :value="4">4 et plus</option>
      </select>
    </label>

    <button class="btn ghost" @click="$emit('reset')">Effacer les filtres</button>
  </aside>
</template>
