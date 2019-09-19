self.addEventListener('fetch', function (e) {
if((e.request.url.indexOf('https://api.foursquare.com') == 0 ||
    e.request.url.indexOf('https://maps.googleapis.com') == 0) && navigator.onLine){
        fetch(e.request)
            .then(function (response) {
                let cacheName = 'onejeet-react-app';
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
    }else {
        e.respondWith(
          caches.match(e.request).then(response => {
            if(response){
                return response;
            }
            return fetch(e.request);
          }).catch(error => {
            return new Response('Not connected to the internet', {
                headers:{
                    'Content-Type':'text/html'
                }
            });
          })
        );
    }
});
