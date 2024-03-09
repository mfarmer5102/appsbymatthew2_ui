import config from '../config';
import {simulateDelay} from '../utils/requestUtils';

export async function getSkills(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/skills?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to load skills.');
    }
}

export async function submitLogout() {
    await simulateDelay();
    try {
        document.cookie = `jsonWebToken=${''}`;
        location.replace("/");
        setTimeout(() => document.location.reload(), 500); // Wipe out GQL cache
    } catch (err) {
        throw new Error('Failed logout.');
    }
}
