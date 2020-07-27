const search = document.querySelector(".js-search"),
      searchInput = search.querySelector("input"),
      searchIcon = document.querySelector(".js-search-icon");
     

const OPACITY = "opacity",  
     UN_OPACITY = "unopacity",
     DO_OPACITY = "do_opacity";

let  iconTarget; //다른 body 영역 클릭과 비교하기 위해서 삽입 , 여기에는 js-search-icon 태그가 들어감

function handleSearch(event){
    event.preventDefault(); 
    const searchValue = searchInput.value;
    location.href = `https://www.google.com/search?q=${searchValue}`; //search by google
}

function handleCloseSearch(event){

    event.preventDefault();

    let target = event.target;
 
    if( iconTarget !== target && searchInput.classList.contains(DO_OPACITY)){

        searchInput.classList.remove(DO_OPACITY);
        searchInput.classList.add(OPACITY);

    }
           
}


function handleSearchBar(event){ //show textbox (opacity 0.4)

    event.preventDefault(); 
    searchInput.classList.remove(OPACITY);
    searchInput.classList.add(UN_OPACITY);
 
}

function handleUnSearch(event){ //hide textbox

    event.preventDefault(); 
    searchInput.classList.remove(UN_OPACITY);
    searchInput.classList.add(OPACITY);
   
}

function handleClickSearch(event){ //click search icon (opacity : 1)

    event.preventDefault();
    searchInput.classList.remove(UN_OPACITY);
    searchInput.classList.add(DO_OPACITY);
    searchInput.focus();

    iconTarget = event.currentTarget;


}

function searchData(){

    searchIcon.addEventListener("mouseover", handleSearchBar);
    searchIcon.addEventListener("mouseout", handleUnSearch);
    searchIcon.addEventListener("click", handleClickSearch); 
    
    search.addEventListener("submit", handleSearch);
    body.addEventListener("click", handleCloseSearch);

}

function init(){

    searchData();

}

init();