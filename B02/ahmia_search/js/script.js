document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler for search
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = document.getElementById('search-input');
            const query = searchInput.value.trim().toLowerCase();
            
            // For educational purposes, direct specific searches to the marketplace
            if (query.includes('marketplace') || 
                query.includes('drugs') || 
                query.includes('silky') || 
                query.includes('silk') || 
                query.includes('road') || 
                query.includes('market')) {
                
                window.location.href = "search-results.html?q=" + encodeURIComponent(query);
            } else {
                // For any other search, show generic results
                window.location.href = "generic-results.html?q=" + encodeURIComponent(query);
            }
        });
    }

    // Adding random .onion domain generation for aesthetic purposes
    const generateRandomOnionAddress = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz234567';
        let result = '';
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result + '.onion';
    };

    // Replace any .onion placeholder elements with random addresses
    const onionPlaceholders = document.querySelectorAll('.onion-placeholder');
    onionPlaceholders.forEach(placeholder => {
        placeholder.textContent = generateRandomOnionAddress();
    });
}); 