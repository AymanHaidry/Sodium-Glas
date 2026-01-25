const Concordia = {
    // Auth Logic - Fixed to handle unique sessions
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
        if (profile.pass === pass) {
            // Set session data for the Grid to read
            localStorage.setItem('sodium_user', profile.user);
            localStorage.setItem('sodium_uid', profile.uid);
            return profile;
        }
        return false;
    },
    logout: () => {
        localStorage.removeItem('sodium_user');
        localStorage.removeItem('sodium_uid');
        window.location.href = 'login.html';
    },

    // Museum Logic
    getMuseum: (slotId) => {
        const data = localStorage.getItem(`spine_${slotId}`);
        return data ? JSON.parse(data) : { name: `GALLERY ${slotId}`, objects: [] };
    },
    sync: (slotId, data) => {
        localStorage.setItem(`spine_${slotId}`, JSON.stringify(data));
    },
    authorize: (slotId, userId) => {
        localStorage.setItem(`owner_${slotId}`, userId);
        console.log(`[CONCORDIA] Authorized ${userId} for ${slotId}`);
    }
};
