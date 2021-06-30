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
            scale: '0.5 0.5 0.5',
            info: 'The Next clue is at the Greek word for an "Empty tomb", look out for the bow without an arrow',
            rotation: '0 180 0',
        },
        {
            url: './assets/bow.gltf',
            scale: '0.5 0.5 0.5',
            info: 'The Next clue is at a gallery, look out for the arrow without a bow',
            rotation: '0 180 0',
        },
        {
            url: './assets/arrow.gltf',
            scale: '0.5 0.5 0.5',
            rotation: '0 180 0',
            info: 'The treasure can be found within Sir John at a University',
        },
        {
            url: './assets/treasure.gltf',
            scale: '0.08 0.08 0.08',
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