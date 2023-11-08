const loadData = async (searchText = "13") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const Phones = data.data;

  showData(Phones);
};

const showData = (phoneDetails) => {
  const showResultArea = document.getElementById("searchResult");
  const showAllBtn = document.getElementById("show__all");
  showResultArea.textContent = "";
  if (phoneDetails.length > 12) {
    phoneDetails = phoneDetails.slice(0, 12);
    showAllBtn.classList.remove("d-none");
  } else {
    showAllBtn.classList.add("d-none");
  }
  for (const data of phoneDetails) {
    const mobileBox = document.createElement("div");
    mobileBox.classList.add("col");
    mobileBox.innerHTML = `
  <div class="card">
    <img src="${data.image}">
    <h4 class="text-center fw-bold">${data.phone_name}</h4>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo earum consequatur eaque facilis sit atque?</p>
    <button onclick="modalInfo('${data.slug}')" type="button" class="btn btn-outline-primary w-50 mx-auto" data-bs-toggle="modal" data-bs-target="#ShowDetails">View Details</button>
  </div>
    `;
    console.log(data);
    showResultArea.appendChild(mobileBox);
    sppinnerLoading(false);
  }
};
// Search text get function
const search = () => {
  const searchField = document.getElementById("search__box");
  const valueSearch = searchField.value;
  sppinnerLoading(true);
  loadData(valueSearch);
};
// Spinner Function
const sppinnerLoading = (isLoading) => {
  const sppinner = document.getElementById("spinner");
  if (isLoading) {
    sppinner.classList.remove("d-none");
  } else {
    sppinner.classList.add("d-none");
  }
};
// Modal Function
const modalInfo = async (modal) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${modal}`
  );
  const data = await res.json();
  const modalData = data.data;
  console.log(modalData);
  //  Set All Data For Modal
  const modalBox = document.getElementById("modalBody");
  modalBox.textContent = "";
  const dataStore = document.createElement("div");
  dataStore.classList.add("modal__box");
  dataStore.innerHTML = `
  <div class="m__image">
  <img  src="${modalData.image}">
  </div>
<h3 class="fw-bold text-center">Name: ${modalData.name} </h3>
<p> <span class="fw-bold">Storage:</span>  <span> ${modalData.mainFeatures.storage} </span></p>
<p> <span class="fw-bold">Display Size:</span>  <span> ${modalData.mainFeatures.displaySize} </span></p>
<p> <span class="fw-bold">Chipest:</span>  <span> ${modalData.mainFeatures.chipSet} </span></p>
<p> <span class="fw-bold">Memory:</span>  <span> ${modalData.mainFeatures.memory} </span></p>
<p> <span class="fw-bold">Slug:</span>  <span> ${modalData.slug} </span></p>
<p> <span class="fw-bold">Release data:</span>  <span> ${modalData.releaseDate} </span></p>
<p> <span class="fw-bold">Brand:</span>  <span> ${modalData.brand} </span></p>
<p> <span class="fw-bold">GPS:</span>  <span> ${modalData.others.GPS} </span></p>

`;
  modalBox.appendChild(dataStore);
};

// Try Dynamic Modal Create But I am Fail!

// const modalArea = () => {
//   const modalPrevArea = document.getElementById("modalArea");
//   const newAreaModal = document.createElement("div");
//   newAreaModal.innerHTML = `
//       <div
//         class="modal fade"
//         id="ShowDetails"
//         tabindex="-1"
//         aria-labelledby="ShowDetailsLabel"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-body" id="modalBody">

//             </div>
//             <div class="modal-footer">
//               <button
//                 type="button"
//                 class="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//   `;
//   modalPrevArea.appendChild(newAreaModal)
// };

loadData();
