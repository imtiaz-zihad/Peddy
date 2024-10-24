// Load categories from the API
const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategorySection(data.categories);
};

// Display categories on the page
const displayCategorySection = (categories) => {
  const displayCategoryContainer =
    document.getElementById("category-container");
  displayCategoryContainer.innerHTML = ""; // Clear previous categories

  categories.forEach((category) => {
    const div = document.createElement("div");

    div.innerHTML = `
            <div id="btn-${category.category}" onclick="loadUniquePets('${category.category}')" class="flex gap-3 bg-white shadow btn rounded-xl mt-2 mb-4 h-7 category-btn">
                <img class="w-10" src="${category.category_icon}" alt="${category.category}">
                <p>${category.category}</p>
            </div>
        `;
    displayCategoryContainer.appendChild(div);
  });
};

// Load all pets from the API
const loadAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPetsSection(data.pets);
};

// Display all pets
const displayAllPetsSection = (pets) => {
  const displayAllPets = document.getElementById("pet-all-container");

  displayAllPets.innerHTML = ""; // Clear previous pets

  if (pets == 0) {
    displayAllPets.classList.remove("grid");
    displayAllPets.innerHTML = `
    
        <div class=" text-center flex items-center flex-col">
       
  <img class="mb-3 mt-14 w-40 h-40" src="/images/error.webp" alt="">
  <p class="font-bold mb-3 text-3xl">No Information Available</p>
  <p class=" mb-14">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
    its layout. The point of using Lorem Ipsum is that it has a.</p>
</div>
        `;
    return;
  }

  displayAllPets.classList.add("grid");
  pets.forEach((pet) => {
    const div = document.createElement("div");

    const petName = (pet.pet_name !== null && pet.pet_name !== undefined) ? pet.pet_name : " Name not given";
    const petBreed = (pet.breed !== null && pet.breed !== undefined) ? pet.breed : " Breed not given";
    const petDOB = (pet.date_of_birth !== null && pet.date_of_birth !== undefined) ? pet.date_of_birth : "Birth Date not given";
    const petGender = (pet.gender !== null && pet.gender !== undefined) ? pet.gender : " Gender not given";
    const petPrice = (pet.price !== null && pet.price !== undefined) ? `${pet.price}$` : "Not Available";
    



    div.innerHTML = `
            <div class="bg-slate-400 rounded-md shadow-md mb-4">
                <div class="p-4 text-[#131313B3]">
                    <img class="rounded-md" src="${pet.image}">
                    <p class="text-black font-bold text-2xl">${petName}</p>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <p>Breed: ${petBreed}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-calendar"></i>
                        <p>Birth: ${petDOB}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-venus"></i>
                        <p>Gender: ${petGender}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price: ${petPrice}</p>
                    </div>
                    <hr>
                    <div class="mt-3 flex justify-around">
                        <p onclick="selectedImageAdd('${pet.image}')" class="btn bg-transparent border bg-white border-[#0E7A81]">
                            <i class="fa-regular fa-thumbs-up"></i>
                        </p>
                        <button id="adopt-btn" onclick="loadModulecount()" class="btn bg-white border border-[#0E7A81] text-[#0E7A81] font-bold">Adopt</button>
                        <button onclick="loadDetails('${pet.petId}')" class="btn bg-white border border-[#0E7A81] text-[#0E7A81] font-bold">Details</button>
                    </div>
                </div>
            </div>
        `;
    displayAllPets.appendChild(div);
  });
};

const removeActive = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};

// Load unique pets based on the selected category
const loadUniquePets = async (category) => {
  const displayAllPets = document.getElementById("pet-all-container");
  displayAllPets.innerText = "";
  displayAllPets.classList.remove("grid");
  displayAllPets.innerHTML = `
    <div class="flex items-center justify-center w-full h-80  bg-gray-100">
      <div id="spinner" class="hidden">
        <svg class="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
    </div>
    `;

  showSpinner();
  removeActive();
  const activeBtn = document.getElementById(`btn-${category}`);
  activeBtn.classList.add("active");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );

  const data = await response.json();
  // Simulate a loading process
  setTimeout(() => {
    hideSpinner(); // Hide the spinner after 2 seconds
    displayAllPetsSection(data.data); // Display the pets after hiding the spinner
  }, 2000);
};
function showSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("spinner").classList.add("hidden");
}

// selected images
const selectedImageAdd = (image) => {
  const selectImage = document.getElementById("selectimages");

  const div = document.createElement("div");
  div.innerHTML = `
        <img class="rounded-md" src="${image}" alt="" />
    `;
  selectImage.appendChild(div);
};

// Load details for a specific pet
const loadDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
};

// Display pet details in the modal
const displayDetails = (pets) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
        <img src="${pets.image}" />
        <p class="text-2xl font-bold">${pets.pet_name}</p>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-boxes-stacked"></i>
            <p>Breed: ${pets.breed}</p>
        </div>
        <div class="flex items-center gap-2">
            <i class="fa-regular fa-calendar"></i>
            <p>Birth: ${pets.date_of_birth}</p>
        </div>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-venus"></i>
            <p>Gender: ${pets.gender}</p>
        </div>
        <div class="flex items-center gap-2 mb-2">
            <i class="fa-solid fa-dollar-sign"></i>
            <p>Price: ${pets.price}$</p>
        </div>
        <hr>
        <p>${pets.pet_details}</p>
    `;

  document.getElementById("customModal").showModal();
};

const loadModulecount = () => {
  const detailContainer = document.getElementById("modal-content");
  const adoptBtn = document.getElementById("adopt-btn");
  // adoptBtn.disabled =true;
  detailContainer.innerHTML = `
         <div class="text-center">
         <h1 class="text-6xl"><i class=" fa-solid fa-handshake" style="color: #74C0FC"></i></h1>
         
    <p class= "text-3xl font-bold">Congrates</p>
     <p class= "">Adoption process start for your pets</p>
         <p id="demo" class="text-4xl font-bold">${countDownvalue()}</p>
         </div>
      `;

  document.getElementById("customModal").showModal();
};

const countDownvalue = () => {
  let count = 3;
  let x = setInterval(function () {
    document.getElementById("demo").innerHTML = count--;
    if (count < 0) {
      clearInterval(x);
      //   const finish = document.getElementById("customModal");
      document.getElementById("customModal").close();
    }
  }, 1000);
};

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
      behavior: "smooth" // Smooth scrolling
  });
}


const sortPetsByPrice = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  const data = await response.json();
  const sortedPets = data.pets.sort((a, b) => b.price - a.price);
  displayAllPetsSection(sortedPets);
};



loadCategory();
loadAllPets();
