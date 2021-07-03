// getting places from APIs
function loadPlaces(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: '0LYHTE1WLLCSAORLJ0PNNQEQAWBKAZAKNQGJNBMT4GBKJBMT',
        clientSecret: 'FINJ2XGPJHTHJNIMHV0PNUIFSLQR21NWBH11GMPMSKCVGGMB',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API (limit param: number of maximum places to fetch)
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30 
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};



window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       
       {
           name: 'Tree',
           location: {
               lng: -1.401949,
               lat: 50.905506,
           }
       },
       {
            name: 'Bow',
            location: {
                lng: -1.405147,
                lat: 50.909649,
             }
        },
       {
            name: 'Arrow',
            location: {
                lng: -1.406448,
                lat: 50.908475,
            }
        },
        {
            name: 'Treasure',
            location: {
                lng: -1.401327,
                lat: 50.908568,
            }
        },
    ];
    }

    var models = [
        {
            url: './assets/tree.gltf',
            scale: '0.08 0.08',
            info: 'The Next clue is at the Greek word for an "Empty tomb", look out for the bow without an arrow',
            rotation: '0 180 0',
        },
        {
            url: './assets/bow.gltf',
            scale: '1 1 1',
            info: 'The Next clue is at a gallery, look out for the arrow without a bow',
            rotation: '0 180 0',
        },
        {
            url: './assets/arrow.gltf',
            scale: '1 1 1',
            rotation: '0 180 0',
            info: 'The treasure can be found within Sir John at a University',
        },
        {
            url: './assets/treasure.gltf',
            scale: '1 1 1',
            rotation: '0 180 0',
            info: 'You Found The Treasure!!!',
        },
    ];

    var modelIndex = 0;
    var setModel = function (model, entity) {
        if (model.scale) {
            entity.setAttribute('scale', model.scale);
        }
    
        if (model.rotation) {
            entity.setAttribute('rotation', model.rotation);
        }
    
        if (model.position) {
            entity.setAttribute('position', model.position);
        }
    
        entity.setAttribute('gltf-model', model.url);
    
        const div = document.querySelector('.instructions');
        div.innerText = model.info;
    };

    function renderPlaces(places) {
        let scene = document.querySelector('a-scene');
    
        places.forEach((place) => {
            let latitude = place.location.lat;
            let longitude = place.location.lng;
    
            let model = document.createElement('a-entity');
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    
            setModel(models[modelIndex], model);
    
            model.setAttribute('animation-mixer', '');
    
            model.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });
    
            scene.appendChild(model);
        });
    }

    function success(pos) {
        var crd = pos.coords;

        if (place.location.lat === crd.latitude && place.location.lng === crd.longitude){
            console.log('You Found It!!!');
            navigator.geolocation.clearWatch(id);
        }
    }

    function error(err){
        console.warn('ERROR('+ err.code + '): '+ err.message);
    }
    options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, error, options)