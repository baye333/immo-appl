// Données d'exemple. Plus tard, on pourra les remplacer par une API.
// mode : 'vente' (prix total) ou 'location' (loyer par mois)
export const properties = [
  {
    id: 1, mode: 'vente', type: 'Villa', title: 'Villa familiale avec jardin',
    city: 'Dakar', district: 'Almadies', price: 185000000, surface: 240, rooms: 5, bathrooms: 3,
    hue: 165, publishedAt: '2026-09-20',
    description: 'Villa de plain-pied dans une rue calme, grand séjour lumineux, cuisine équipée, jardin clos et garage pour deux véhicules.',
    features: ['Jardin', 'Garage', 'Groupe électrogène', 'Gardien']
  },
  {
    id: 2, mode: 'vente', type: 'Appartement', title: 'Appartement vue mer',
    city: 'Dakar', district: 'Mermoz', price: 92000000, surface: 98, rooms: 3, bathrooms: 2,
    hue: 200, publishedAt: '2026-09-27',
    description: 'Appartement au 5e étage avec balcon et vue dégagée. Résidence sécurisée avec ascenseur et parking.',
    features: ['Balcon', 'Ascenseur', 'Parking', 'Climatisation']
  },
  {
    id: 3, mode: 'vente', type: 'Terrain', title: 'Terrain viabilisé de 300 m²',
    city: 'Thiès', district: 'Cité Sipres', price: 24000000, surface: 300, rooms: 0, bathrooms: 0,
    hue: 85, publishedAt: '2026-09-10',
    description: 'Terrain plat, titre foncier disponible, eau et électricité à proximité. Idéal pour une construction résidentielle.',
    features: ['Titre foncier', 'Eau', 'Électricité']
  },
  {
    id: 4, mode: 'vente', type: 'Villa', title: 'Villa en bord de plage',
    city: 'Saly', district: 'Saly Portudal', price: 260000000, surface: 310, rooms: 6, bathrooms: 4,
    hue: 30, publishedAt: '2026-08-30',
    description: 'Villa avec piscine à 200 m de la plage. Six chambres, terrasse couverte et dépendance pour le personnel.',
    features: ['Piscine', 'Terrasse', 'Dépendance', 'Climatisation']
  },
  {
    id: 5, mode: 'location', type: 'Studio', title: 'Studio meublé proche université',
    city: 'Dakar', district: 'Fann', price: 220000, surface: 28, rooms: 1, bathrooms: 1,
    hue: 275, publishedAt: '2026-09-29',
    description: 'Studio meublé et équipé, internet fibre inclus. Charges comprises, disponible immédiatement.',
    features: ['Meublé', 'Fibre', 'Charges incluses']
  },
  {
    id: 6, mode: 'location', type: 'Appartement', title: 'F3 lumineux au centre-ville',
    city: 'Thiès', district: 'Centre-ville', price: 250000, surface: 85, rooms: 3, bathrooms: 1,
    hue: 140, publishedAt: '2026-09-15',
    description: 'Appartement au 2e étage, deux chambres, séjour et cuisine séparée. À deux pas du marché et des transports.',
    features: ['Cuisine séparée', 'Compteur individuel']
  },
  {
    id: 7, mode: 'location', type: 'Villa', title: 'Villa 4 chambres avec cour',
    city: 'Dakar', district: 'Ouakam', price: 900000, surface: 200, rooms: 4, bathrooms: 3,
    hue: 15, publishedAt: '2026-09-22',
    description: 'Villa récente dans un quartier résidentiel, cour intérieure, forage, parking pour trois véhicules.',
    features: ['Forage', 'Parking', 'Cour intérieure', 'Gardien']
  },
  {
    id: 8, mode: 'location', type: 'Appartement', title: 'T2 neuf avec balcon',
    city: 'Dakar', district: 'Sicap Liberté', price: 380000, surface: 62, rooms: 2, bathrooms: 1,
    hue: 235, publishedAt: '2026-10-01',
    description: 'Appartement neuf au 3e étage, finitions modernes, balcon et place de parking. Caution de deux mois.',
    features: ['Balcon', 'Parking', 'Neuf']
  }
]

export const propertyTypes = ['Appartement', 'Villa', 'Studio', 'Terrain']
