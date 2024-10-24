const loadCategory = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    displayCategorySection(data.categories);
    // console.log(data.categories);
  };
  loadCategory();
  const displayCategorySection = (categories) => {
    const displayCategoryContainer =
      document.getElementById("category-container");
    categories.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `
           
                  <div onclick = "displayUniquePost(${post.category})" class="flex gap-3 bg-white shadow btn rounded-xl mt-2 mb-4 h-7 ">
                      <img class="w-10" src=${post.category_icon} alt="">
                      <p>${post.category}</p>
                  </div>
              
          `;
      displayCategoryContainer.appendChild(div);
    });
  };
  
  const loadAllPets = async () => {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    displayAllPetsSection(data.pets);
  };
  loadAllPets();
  
  const displayAllPetsSection = (pets) => {
    const displayAllPets = document.getElementById("pet-all-container");
    pets.forEach((e) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <div class=" bg-slate-400  rounded-md shadow-md mb-4">
              <div class="p-4 text-[#131313B3]">
                  <img class="rounded-md " src=${e.image} alt="">
                  <p class="text-black font-bold text-2xl">${e.pet_name}</p>
  
                  <div class="flex items-center gap-2">
                      <i class="fa-solid fa-boxes-stacked"></i>
                      <p>Breed : ${e.breed}</p>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="fa-regular fa-calendar"></i>
                      <p>Birth : ${e.date_of_birth}</p>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="fa-solid fa-venus"></i>
                      <p>Gender : ${e.gender}</p>
                  </div>
                  <div class="flex items-center gap-2 mb-2">
                      <i class="fa-solid fa-dollar-sign"></i>
                      <p>Price : ${e.price}$ </p>
                  </div>
                  <hr>
                  <div class="mt-3 flex justify-around">
                      <p onclick="selectedImageAdd('${e.image}')"  class="btn bg-transparent border bg-white border-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></p>
                      <button class="btn bg-white border border-[#0E7A81] text-[#0E7A81] font-bold">Adopt</button>
                      <button onclick="loadDetails('${e.petId}')" class="btn bg-white border border-[#0E7A81] text-[#0E7A81] font-bold">Details</button>
                      
                  </div>
              </div>
          </div>
          `;
      displayAllPets.appendChild(div);
    });
  };
  
  
  const loadUniquePets =async () => {
      const response = await fetch(
        "https://openapi.programming-hero.com/api/peddy/category/Rabbit"
        );
        const data = await response.json();
        displayUniquePost(data.pets);
        console.log(data.price);
        
        //https://openapi.programming-hero.com/api/peddy/category/${category}
      
  };
  loadUniquePets();
  const displayUniquePost = () =>{
  
  }
  
  const selectedImageAdd = (image) => {
    const selectImage = document.getElementById("selectimages");
  
    const div = document.createElement("div");
    div.innerHTML = `
        <img class="rounded-md" src=${image} alt="" />
      `;
    selectImage.appendChild(div);
  };
  
  const loadDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);
  };
  
  const displayDetails = (pets) => {
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `
      <img src= ${pets.image}/>
      <p class= "text-2xl font-bold">${pets.pet_name}</p>
      <div class="flex items-center gap-2">
                      <i class="fa-solid fa-boxes-stacked"></i>
                      <p>Breed : ${pets.breed}</p>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="fa-regular fa-calendar"></i>
                      <p>Birth : ${pets.date_of_birth}</p>
                  </div>
                  <div class="flex items-center gap-2">
                      <i class="fa-solid fa-venus"></i>
                      <p>Gender : ${pets.gender}</p>
                  </div>
                  <div class="flex items-center gap-2 mb-2">
                      <i class="fa-solid fa-dollar-sign"></i>
                      <p>Price : ${pets.price}$ </p>
                  </div>
                  <hr>
  
      <p>${pets.pet_details}
      `;
  
    document.getElementById("customModal").showModal();
  };
  
  
  
  