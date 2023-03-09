import { Capacitor ,Plugins } from '@capacitor/core';

const {Http, Device  } = Plugins;

class Welcome extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div>
        <h1>Vicinity Tags</h1>
        <p id="user-agent"></p>
        <br>
        <p id="app-details"></p>
        <br>
        <p id="app-name"></p>
        <br>
        <p id="serial"></p>
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

    // Get User Agent Details
    const userAgentDiv = this.querySelector("#user-agent");

    userAgentDiv.innerText = "User Agent: " + navigator.userAgent;

    // Get Location Details
    const locationDiv = this.querySelector("#location");

    const addressDiv = this.querySelector("#address");

    Geolocation.getCurrentPosition().then(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      locationDiv.innerText = "Latitude: " + latitude + ", Longitude: " + longitude;

      fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat="+latitude+"&lon="+longitude)
      .then(response => response.json())
      .then(data => {
      addressDiv.innerText = "Address: "+  data.display_name;
      });
    }).catch(error => {
      console.error(error);
    });

    const serialNumberDiv = this.querySelector("#serial");

    serialNumberDiv.innerText = "Serial Number: " + navigator.platform;

    // Get App Details

    const appDetailsDiv = this.querySelector("#app-details");
    const appNameDiv = this.querySelector("#app-name");

    appDetailsDiv.innerText = "Application Details: " +navigator.appCodeName;

    appNameDiv.innerText = "App Name: " +  navigator.appName;

    // Get IP Address
    const ipAddressDiv = this.querySelector("#ip-address");

    fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(data => {
        ipAddressDiv.innerText = "IP Address: " + data.ip;
      });
  }
}

window.customElements.define('capacitor-welcome', Welcome);