/**
 * Nettoie un numéro de téléphone pour un usage dans un lien `tel:` :
 * garde uniquement les chiffres et un éventuel `+` initial (indicatif
 * international), supprime espaces, points, tirets et parenthèses.
 */
export function formatPhoneForTel(phone: string): string {
    return phone.replace(/[^0-9+]/g, '');
}
