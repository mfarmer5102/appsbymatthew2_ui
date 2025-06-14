let apiLocation = "/api"
if (process.env.NODE_ENV === 'development') apiLocation = "http://localhost:8081/api"

const config = {
    apiUrl: `${apiLocation}`,
    socketNamespace: `${apiLocation}`,
    simulatedDelay: 0,
    imageUrlBasePath: "https://mfarmer5102-public.s3.us-east-1.amazonaws.com/application_data/apps_by_matthew/application_thumbnails/"
}

export default config;
