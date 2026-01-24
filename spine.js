const Concordia = {
    // Auth Logic
    register: (user, pass) => {
        if (localStorage.getItem(`auth_${user}`)) return false;
        const uid = "SOD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
        const profile = { user, pass, uid };
        localStorage.setItem(`auth_${user}`, JSON.stringify(profile));
        return profile;
    },
    login: (user, pass) => {
        const stored = localStorage.getItem(`auth_${user}`);
        if (!stored) return false;
        const profile = JSON.parse(stored);
        return profile.pass === pass ? profile : false;
    },
    logout: () => {
        sessionStorage.clear();
        window.location.href = 'login.html';
    },

    // Museum & Ownership Logic
    getMuseum: (slotId) => {
        const data = localStorage.getItem(`spine_${slotId}`);
        return data ? JSON.parse(data) : { name: `GALLERY ${slotId}`, objects: [] };
    },
    sync: (slotId, data) => {
        localStorage.setItem(`spine_${slotId}`, JSON.stringify(data));
    },
    authorize: (slotId, userId) => {
        // FIXED: Now correctly maps to the key the grid checks
        localStorage.setItem(`owner_${slotId}`, userId);
        console.log(`[CONCORDIA] Authorized ${userId} for ${slotId}`);
    }
};