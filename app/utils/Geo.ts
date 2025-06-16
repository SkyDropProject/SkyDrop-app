export async function getAddressFromCoords(latitude: number, longitude: number): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const address = data.address;
        const locality = address.city || address.town || address.village;
        const street = [address.house_number, address.road].filter(Boolean).join(' ');
        if ((street || locality) && address.country) {
            const parts = [];
            if (street) parts.push(street);
            if (locality) parts.push(locality);
            parts.push(address.country);
            return parts.join(', ');
        }
        return 'Adresse inconnue';
    } catch {
        return 'Adresse inconnue';
    }
}
