export const simulateDelay = async () => {
    return new Promise(resolve => setTimeout(resolve, process.env.REACT_APP_SIMULATED_DELAY || 0));
}
