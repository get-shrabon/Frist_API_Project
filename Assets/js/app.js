function loadData(searchText = "13") {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => showData(data.data));
  searchContainer.textContent = "";
}
const searchContainer = document.getElementById("searchResult");
function showData(cards) {
  const showAllArea = document.getElementById("show__all");
  if (cards.length > 12) {
    showAllArea.classList.remove("d-none");
  } else {
    showAllArea.classList.add("d-none");
  }
  cards = cards.slice(0, 12);
  for (const card of cards) {
    console.log(searchContainer);
    const newCard = document.createElement("div");
    newCard.classList.add("col");
    newCard.innerHTML = `
    <div class="card h-100">
    <img src="${card.image}" class="card-img-top">
    <h5 class="card-title">${card.phone_name}</h5>
    <button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showButton('${card.slug}')" type="button" class="btn btn-primary">Show Details</button>
    </div>
    `;
    searchContainer.appendChild(newCard);
    spinner(false);
  }
}
function search() {
  const searchBox = document.getElementById("search__box");
  const searchValue = searchBox.value;
  loadData(searchValue);
  spinner(true);
}
const spinner = (isLoading) => {
  const spinnerLoader = document.getElementById("spinner");
  if (isLoading) {
    spinnerLoader.classList.remove("d-none");
  } else {
    spinnerLoader.classList.add("d-none");
  }
};
// Show All Buttton
const showButton = async (slug) => {
  console.log("Show Button Clicked", slug);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const contents = await res.json();
  const phoneDetails = contents.data;
   const modalBackdrop = document.getElementById("staticBackdrop");
   const modalContainer = document.createElement("div");
   modalContainer.classList.add("modal-dialog");
   modalContainer.classList.add("modal-dialog-centered");
   const modalContent = document.createElement("div");
   modalContent.classList.add("modal-content");
   const modalHeader = document.createElement("div");
   modalHeader.classList.add("modal-header");
   modalHeader.innerHTML = `

`;
   const modalBody = document.createElement("div");
   modalBody.classList.add("modal-body");
   modalBody.innerHTML = `
   <img class="mx-auto" src="${phoneDetails.image}">
  <h3 id="phone__title" class="fw-bold">${phoneDetails.name}</h3>
  `;
   const modalFooter = document.createElement("div");
   modalFooter.classList.add("modal-footer");
   modalFooter.innerHTML = `
    <button type="button" id="close__btn" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
  `;
   modalContent.appendChild(modalHeader);
   modalContent.appendChild(modalBody);
   modalContent.appendChild(modalFooter);
   modalContainer.appendChild(modalContent);
   modalBackdrop.appendChild(modalContainer);

  console.log(phoneDetails);
};

loadData();
