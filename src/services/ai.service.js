import config from '../config';
import {simulateDelay} from '../utils/requestUtils';

export async function processTextWithAi(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/ai?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to process.');
    }
}

export async function searchEmbeddingsPlus(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/ai/searchEmbeddingsPlus?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to process.');
    }
}

export async function genericFunctionCall(params) {
    await simulateDelay();
    const response = await fetch(`${config.apiUrl}/ai/genericFunctionCall?${params}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({username, password})
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Unable to process.');
    }
}