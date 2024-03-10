import config from '../config';
import {simulateDelay} from '../utils/requestUtils';

export async function getSupportStatuses(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/supportStatuses?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to load support statuses.');
    }
}
