const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/';
const apiKey = 'solaris-1Cqgm3S6nlMechWO';

// Function to create a celestial body
function createCelestialBody(id, type, name, latinName, rotation, circumference, temperature, distance, orbitalPeriod, description, moons) {
  return {
    id,
    type,
    name,
    latinName,
    rotation,
    circumference,
    temperature,
    distance,
    orbitalPeriod,
    description,
    moons
  };
}

// Array to store celestial bodies
let celestialBodiesData = [];
// Function to fetch celestial bodies from the API
async function fetchCelestialBodies() {

  try {
    let response = await fetch(`${apiUrl}/bodies`, {
      method: "GET",
      headers: { "x-zocom": apiKey },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    celestialBodiesData = data.bodies;
    console.log(celestialBodiesData);
  } catch (error) {
    console.error(error);
  }
}

// Function to find a celestial body by name
function findCelestialBodyByName(event) {
  debugger;
  // Get the data-name attribute from the clicked element
  let name = event.target.getAttribute('data-name') || event.target.parentElement?.getAttribute('data-name');

  // If the data-name attribute is found on the clicked element, check for a match
  if (name) {
    const matchingBody = celestialBodiesData.find(body => body.name.toLowerCase() === name.toLowerCase());
    if (matchingBody) {
      showInformation(matchingBody, event);
    }
  }
}

// Function to display information about a celestial body
function showInformation(celestialBody, event) {
  const planetInfoElement = document.getElementById('planetInfo');
  debugger;

  // HTML content for displaying information
  const html = `
    <h3>${celestialBody.latinName}</h3>
    <p>ID: ${celestialBody.id}</p>
    <p>Rotation: ${celestialBody.rotation}</p>
    <p>Temperature: ${celestialBody.temperature}</p>
  
  `;

  // Get the mouse coordinates from the event
  const x = event.clientX + 'px';
  const y = event.clientY + 'px';

  // Update the element with information and display it at the mouse coordinates
  planetInfoElement.innerHTML = html;
  planetInfoElement.style.display = 'block';
  planetInfoElement.style.position = 'absolute';
  planetInfoElement.style.top = y;
  planetInfoElement.style.left = x;
}

// Call the function to fetch celestial bodies when the page loads
document.addEventListener('DOMContentLoaded', function () {
  // Call the function to fetch celestial bodies when the page loads
  fetchCelestialBodies();
});

