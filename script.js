if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js') // Path to your service worker file
        .then(registration => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

document.getElementById('fetchBtn').addEventListener('click', fetchDogImages);

function fetchDogImages() {
    const breed = document.getElementById('breedInput').value.toLowerCase().trim();
    const imagesContainer = document.getElementById('images');
    const loading = document.getElementById('loading');

    // Clear previous content
    imagesContainer.innerHTML = '';

    if (!breed) {
        alert('Please enter a dog breed!');
        return;
    }

    loading.style.display = 'block';

    fetch(`https://dog.ceo/api/breed/${breed}/images`)  // Fixed string interpolation here
        .then(response => {
            if (!response.ok) {
                throw new Error('Breed not found');
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = 'none';

            if (data.status === 'success') {
                data.message.slice(0, 10).forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = breed;
                    imagesContainer.appendChild(imgElement);
                });
            } else {
                imagesContainer.innerHTML = '<p style="color: red;">No images found for breed: ' + breed + '</p>';
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            imagesContainer.innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
        });
}
