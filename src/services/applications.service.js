import config from '../config';
import {simulateDelay} from '../utils/requestUtils';

export async function getApplications(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/applications?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to load applications.');
    }
}
