// Define hostname
// const hostname = window && window.location && window.location.hostname ? window.location.hostname : 'localhost';
// const hostMap = {
//     "www.verdantime.com": "https://verdantime-api-gdp3ec67kq-uc.a.run.app",
//     "verdantime.com": "https://verdantime-api-gdp3ec67kq-uc.a.run.app",
//     "matthews-air.lan": "http://matthews-air.lan",
//     "meh2bpvppc.us-east-1.awsapprunner.com": "https://jwnngmkhkg.us-east-1.awsapprunner.com"
// }

// module.exports = {
//     config: {
//         apiUrl: process.env.NODE_ENV == 'development' ?  'http://localhost:5001/api' : 'https://appsbymatthew-api-nbfecgrwuq-uc.a.run.app/api'
//     }
// }

let apiLocation = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/api'
    : 'https://appsbymatthew2-api-nbfecgrwuq-uc.a.run.app/api'


// // 1st - Look for build variable; 2nd - Look at hostname; 3rd - Default to localhost
// if (process.env.REACT_APP_API_LOCATION) {
//     apiLocation = process.env.REACT_APP_API_LOCATION;
// } else if (hostname && hostMap && hostMap[hostname]) {
//     apiLocation = hostMap[hostname];
// } else {
//     apiLocation = 'http://localhost:5001/api';
// }

// Define config object
const config = {
    apiUrl: `${apiLocation}`,
    socketNamespace: `${apiLocation}`,
    simulatedDelay: 0,
    imageUrlBasePath: "https://mfarmer5102-public.s3.us-east-1.amazonaws.com/application_data/apps_by_matthew/application_thumbnails/"
}

export default config;
