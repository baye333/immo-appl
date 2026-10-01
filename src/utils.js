const nf = new Intl.NumberFormat('fr-FR')

export function formatPrice(property) {
  const amount = nf.format(property.price).replace(/\u202f|\u00a0/g, ' ')
  return property.mode === 'location' ? `${amount} FCFA / mois` : `${amount} FCFA`
}
