//import { array } from "prop-types";

// getting places from APIs
function loadPlaces(position) {

    const poi_coords = { "displayFieldName": "", "fieldAliases": { "OID": "OID" }, "geometryType": "esriGeometryPoint", "spatialReference": { "wkid": 4326, "latestWkid": 4326 }, "fields": [{ "name": "OID", "type": "esriFieldTypeOID", "alias": "OID" }], "features": [{ "attributes": { "OID": 18 }, "geometry": { "x": 51.412966883137955, "y": 35.732643759558385 } }, { "attributes": { "OID": 19 }, "geometry": { "x": 51.412909215633825, "y": 35.73265246871309 } }, { "attributes": { "OID": 21 }, "geometry": { "x": 51.41291256839526, "y": 35.73268186207423 } }] };
    return poi_coords
    // const params = {
    //     radius: 300,    // search places not farther than this value (in meters)
    //     clientId: '<your-client-id>',
    //     clientSecret: '<your-client-secret>',
    //     version: '20300101',    // foursquare versioning, required but unuseful for this demo
    // };

    // // CORS Proxy to avoid CORS problems
    // const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // // Foursquare API (limit param: number of maximum places to fetch)
    // const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
    //     &ll=${position.latitude},${position.longitude}
    //     &radius=${params.radius}
    //     &client_id=${params.clientId}
    //     &client_secret=${params.clientSecret}
    //     &limit=30 
    //     &v=${params.version}`;
    // return fetch(endpoint)
    //     .then((res) => {
    //         return res.json()
    //             .then((resp) => {
    //                 return resp.response.venues;
    //             })
    //     })
    //     .catch((err) => {
    //         console.error('Error with places API', err);
    //     })
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        var poicoords = loadPlaces(position.coords)
        console.log(poicoords);
        poicoords.features.forEach(function (value) {
            const latitude = value.geometry.y;
            const longitude = value.geometry.x;
            // add place name
            const placeText = document.createElement('a-link');
            placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            placeText.setAttribute('title', value.attributes.OID);
            placeText.setAttribute('scale', '15 15 15');

            placeText.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });
            console.log(placeText)

            scene.appendChild(placeText);

        });


        // .then((places) => {
        //     places.forEach((place) => {
        //         const latitude = place.location.lat;
        //         const longitude = place.location.lng;

        // // add place name
        // const placeText = document.createElement('a-link');
        // placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        // placeText.setAttribute('title', place.name);
        // placeText.setAttribute('scale', '15 15 15');

        // placeText.addEventListener('loaded', () => {
        //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        // });

        // scene.appendChild(placeText);
        // });
        // })
    },
        // (err) => console.error('Error in retrieving position', err),
        // {
        //     enableHighAccuracy: true,
        //     maximumAge: 0,
        //     timeout: 27000,
        // }
    );
};
