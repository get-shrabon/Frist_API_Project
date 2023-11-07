function loadData(searchText) {
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
    <button type="button" class="btn btn-primary">Buy Now</button>
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
loadData();
