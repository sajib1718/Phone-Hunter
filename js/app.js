const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data))

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);



}

const displayPhones = (phones, dataLimit) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    }
    else {
        showAll.classList.add('d-none');

    }


    const noFound = document.getElementById('noFound');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    }
    else {
        noFound.classList.add('d-none');
    }


    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `<div class="card p-4">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name} </h5>
         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

         <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
    </div>`

        phoneContainer.appendChild(phoneDiv);

    });

    toggleLoader(false);



}

const processSearch = (dataLimit) => {

    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {

    processSearch(10);

})

// enter key 

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // code for enter
        processSearch(10);
    }
});

const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');

    }
    else {

        loader.classList.add('d-none');
    }


}



document.getElementById('btn-show-all').addEventListener('click', function () {

    processSearch();

})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);


}

const displayPhoneDetails = phone => {

    const phoneModelDetail = document.getElementById('exampleModalLabel');
    phoneModelDetail.innerText = phone.name;

    const releaseDate = document.getElementById('releaseDate');
    releaseDate.innerHTML = `
    <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'not found'} </p>
    <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.memory : 'no storage information found'} </p>
    <p> others : ${phone.others ? phone.others.Bluetooth : 'not found'} </p>
    <p> Sensor : ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'not found'} </p>

    `
}



loadPhones('apple');