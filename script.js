function init()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (

            gpspos=> {
               naviLocation === gpspos
            },

            err=> {
                alert(`An error occurred: ${err.code}`);
            }

        );
    }
    


window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       
       {
           name: 'Welcome Tree',
       },
    ];
    }


    var models = [
        {
            url: './assets/tree.gltf',
            scale: '0.8 0.8 0.8',
            info: 'The First clue is at the Greek word for an "Empty tomb", look out for the bow without an arrow',
            rotation: '0 180 0',
            location: {
                lng: naviLocation.longitude,
                lat: naviLocation.latitude
         }
        },
        {
            url: './assets/bow.gltf',
            scale: '1 1 1',
            info: 'The Next clue is at a gallery, look out for the arrow without a bow',
            rotation: '0 180 0',
            location: {
                lng: -1.405147,
                lat: 50.909649,
             }
        },
        {
            url: './assets/arrow.gltf',
            scale: '1 1 1',
            rotation: '0 180 0',
            info: 'The treasure can be found within Sir John at a University nearby',
            location: {
                lng: -1.406448,
                lat: 50.908475,
            }
        },
        {
            url: './assets/treasure.gltf',
            scale: '1 1 1',
            rotation: '0 180 0',
            info: 'You Found The Treasure!!!',
            location: {
                lng: -1.401327,
                lat: 50.908568,
            }
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

        if (model.location){
            entity.setAttribute('location', model.location)
        }
    
        entity.setAttribute('gltf-model', model.url);
    
        const div = document.querySelector('.instructions');
        div.innerText = model.info;
    };

    function renderPlaces(places) {
        let scene = document.querySelector('a-scene');
    
        places.forEach((place) => {
            let latitude = place.model.location.lat;
            let longitude = place.model.location.lng;
    
            let model = document.createElement('a-entity');
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    
            setModel(models[modelIndex], model);
    
            model.setAttribute('animation-mixer', '');
    
            document.querySelector('button[data-action="change"]').addEventListener('click', function () {
                var entity = document.querySelector('[gps-entity-place]');
                modelIndex++;
                var newIndex = modelIndex % models.length;
                setModel(models[newIndex], entity);
            });
    
            scene.appendChild(model);
        });
    }

    function success(place) {
        var crd = place.coords;

        if (place.model.location.lat === crd.latitude && place.model.location.lng === crd.longitude){
            console.log('You Found It!!!');
            navigator.geolocation.clearWatch(id);
        }
    }
    options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, options)
}