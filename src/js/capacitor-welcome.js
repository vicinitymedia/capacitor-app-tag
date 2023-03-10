import { Capacitor, Plugins } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
const { Http, Device } = Plugins;

class Welcome extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div>
        <h1>Vicinity Tags</h1>
        <p id="user-agent"></p>
        <br>
        <p id="app-name"></p>
        <br>
        <p id="zoneId"></p>
        <br>
        <p id="rfid"></p>
        <br>
        <p id="ip-address"></p>
        <br>
        <p id="address"></p>
        <br>
        <p id="location"></p>
      </div>
    `;
  }

  connectedCallback() {


    Geolocation.getCurrentPosition().then(position => {
      const locationDiv = this.querySelector("#location");
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locationDiv.innerText = "Latitude: " + latitude + ", Longitude: " + longitude;

      const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude;
      fetch(url)
        .then(response => response.json())
        .then(addresData => {
          const addressDiv = this.querySelector("#address")
          addressDiv.innerText = "Address: " + addresData.display_name;
          const address = addresData.display_name;


          const zoneIdDiv = this.querySelector("#zoneId");
          zoneIdDiv.innerText = "ZoneId: " + "1211";
          const zoneId = "1211";

          const userAgentDiv = this.querySelector("#user-agent");
          userAgentDiv.innerText = "User Agent: " + navigator.userAgent;
          const user_agent = navigator.userAgent;

          const serialNumberDiv = this.querySelector("#rfid");
          serialNumberDiv.innerText = "Rf_id: " + navigator.platform;
          const rf_id = navigator.appName;

          const appNameDiv = this.querySelector("#app-name");
          appNameDiv.innerText = "App Name: " + navigator.appName;
          const app_name = navigator.appName;
          console.log(address);
          fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(ipdata => {
              const ipAddressDiv = this.querySelector("#ip-address");
              const ip_address = ipdata.ip;
              ipAddressDiv.innerText = "IP Address: " + ip_address;

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

  }
}

window.customElements.define('capacitor-welcome', Welcome);