let generateUser = document.querySelector("#generate-user");
let removeUser = document.querySelector("#add-user");
let createUserContainer = document.querySelector(".user-container");
let gridContainer = document.querySelector(".grid-container");
let closeBtn = document.querySelector('i');
let searchBox = document.querySelector('#userSearch');
let resultsFound = document.querySelector('#results-found');


// Fetch the RANDOM USER API and display on DOM
async function generateUserInfo() {
  console.log("something.....");
  let fetchAPI = await fetch("https://randomuser.me/api/");
  let jsonData = await fetchAPI.json();

  let userdata = `
  <i class="bi bi-x close-icon"></i>
  <img src="${jsonData.results[0].picture.medium}" alt="profile" class="profile-container">
                <table>
                    <tbody>
                        <tr class="first-row">
                            <td>
                                <i class="bi bi-person-fill icon-clr icon-size"></i>
                                ${jsonData.results[0].name.first} 
                            </td>
                            <td>
                            <i class="bi bi-gender-male icon-clr icon-size"></i>
                                ${jsonData.results[0].gender}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i class="bi bi-calendar-plus icon-clr icon-size"></i>
                                ${jsonData.results[0].dob.age}
                            </td>
                            <td>
                                <i class="bi bi-person-arms-up icon-clr icon-size"></i>
                                ${jsonData.results[0].name.title}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="country">
                                <i class="bi bi-geo-alt-fill icon-clr icon-size" id="country"></i>
                                ${jsonData.results[0].location.city}, ${jsonData.results[0].location.state}, ${jsonData.results[0].location.country}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <i class="bi bi-telephone-fill icon-clr icon-size"></i>
                                ${jsonData.results[0].phone}, ${jsonData.results[0].cell}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;

  let creatUserCustomeContainer = document.createElement("div");
  creatUserCustomeContainer.className = "user-container";

  creatUserCustomeContainer.insertAdjacentHTML("beforeend", userdata);
  gridContainer.appendChild(creatUserCustomeContainer);

}
generateUser.addEventListener("click", generateUserInfo);

// Delete each user
function deleteUser(e){
    console.log(e.target.className);
    if(e.target.parentNode.className === 'user-container' && e.target.className === 'bi bi-x close-icon')
        if(confirm('Do you want to delete this user?'))
            e.target.parentNode.remove();
}

document.addEventListener('click',deleteUser);

// Store country of each user
function locationAccess(){
    let getAllUserContainers = Array.from(gridContainer.children);
    let countryArr = [];

    for (let user of getAllUserContainers){

        let childNodes = user.childNodes;
        let table = Array.from(childNodes[5].children);
        let tableChildren = Array.from(table[0].children);
        let tableRow = tableChildren[2];
        let tableData = tableRow.childNodes[1];
        let locationn = tableData.textContent;
        let country = locationn.trim().split(',')[2].toLowerCase().trimStart();

        // console.log(country);
        countryArr.push(country);
    }

    return countryArr;

}

// Display no of users found by search field
function filterUser(){
    let searchVal = document.querySelector('#userSearch').value.toLowerCase();

    (locationAccess().filter((countries) => countries === searchVal).length > 0) ?
        resultsFound.innerText = `Totally ${locationAccess().filter((countries) => countries === searchVal).length} users were found` : resultsFound.innerText = `No user were found`;

    if(searchVal == ''){
        resultsFound.innerText = '';
    }

    console.log(locationAccess());
       
}
searchBox.addEventListener('input',filterUser);


