document.addEventListener('DOMContentLoaded', () => {
    const modsContainer = document.getElementById('mods-container');
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // URL du proxy CORS Anywhere
    const apiUrl = 'https://api.gamebanana.com/Core/Item/Data';

    const fetchMods = async () => {
        try {
            const response = await fetch(corsProxy + apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemtype: 'Studio',
                    itemid: '37260',
                    fields: 'name,description,Links',
                }),
            });

            const data = await response.json();
            displayMods(data._aChildren);
        } catch (error) {
            console.error('Error fetching mods:', error);
        }
    };

    const displayMods = (mods) => {
        modsContainer.innerHTML = '';
        mods.forEach(mod => {
            const modElement = document.createElement('div');
            modElement.classList.add('mod');
            modElement.innerHTML = `
                <h2>${mod._sName}</h2>
                <p>${mod._sText}</p>
                <a href="https://gamebanana.com/mods/${mod._idItem}" target="_blank">View Mod</a>
            `;
            modsContainer.appendChild(modElement);
        });
    };

    fetchMods();
    setInterval(fetchMods, 60000);  // Update every minute
});
