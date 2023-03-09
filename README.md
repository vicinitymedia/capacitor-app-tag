## Vicinity Tag capacitor app

Github repository
https://github.com/vicinitymedia/capacitor-app-tag


For app installation

```
npm install 
```

then run 

```
npm run build 
```

then run 

```
npm sync
```

for web run 

```
npm start 
```

for android  run

```
npx cap run android
```


You need to add this code that will post the data to the end point on the postData function. 

you will need to change  the zoneId to the variables. 

Also import the Geolocation.

```
import { Geolocation } from '@capacitor/geolocation';
```

```
Geolocation.getCurrentPosition().then(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude;
    fetch(url)
    .then(response => response.json())
    .then(addresData => {
        const address = addresData.display_name;
        const zoneId = '1211';
        const user_agent = navigator.userAgent;
        const rf_id = navigator.appName;
        const app_name = navigator.appName;
        console.log(address);
        fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(ipdata => {
            const ip_address = ipdata
            const data = {
              "zoneId": zoneId,
              "rf_id": rf_id,
              "app_name": app_name,
              "user_agent": user_agent,
              "ip_address": ip_address,
              "latitude": latitude,
              "longitude": longitude,
              "address": address
            };
            postData('https://leo.vic-m.co/api/mobile-tags', data)
              .then(response => {
                console.log(response);
            })
              .catch(error => {
                console.error(error);
            });
          });
      });
    }).catch(error => {
      console.error(error);
});
   
function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error(error);
    });
}
```


