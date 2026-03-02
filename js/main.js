//clear data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteAllBtn = document.getElementById("deleteAll");
let TempVar;
let mood = 'create';
let searchMood = 'title';

//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(20, 170, 20)';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(219, 5, 5)';
    }
}

// create product && save localstorage

let dataTable;

if (localStorage.product != null) {
    dataTable = JSON.parse(localStorage.getItem('product'));
} else {
    dataTable = []
}
submit.onclick = function () {
    let data = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    //count

    if (title.value != '' && price.value != '' && category.value != '' && data['count'] < 100 ) {
        if (mood === 'create') {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataTable.push(data);
                }
            } else {
                dataTable.push(data);
            }
        } else {
            dataTable[TempVar] = data;
            mood = 'create';
            submit.style.display = "block";
            count.style.display = 'block'
            submit.innerHTML = 'Create';

        }
        clearData();
    }
    submit.style.backgroundColor = ' rgba(35, 35, 218, 0.826)';
    total.style.backgroundColor = 'rgb(219, 5, 5)';
    localStorage.setItem('product', JSON.stringify(dataTable));
    showData();
}

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData() {
    let table = '';
    for (let i = 0; i < dataTable.length; i++) {
        tbody.innerHTML =
            table += ` <tr>
                <td>${i + 1}</td>
                <td>${dataTable[i]['title']}</td>
                <td>${dataTable[i]['price']}</td>
                <td>${dataTable[i]['taxes']}</td>
                <td>${dataTable[i]['ads']}</td>
                <td>${dataTable[i]['total']}</td>
                <td>${dataTable[i]['category']}</td>
                <td>
                    <button onclick=updateData(${i}) id="update">update</button>
                </td>
                <td>
                    <button onclick=deleteData(${i}) id="delete">delete</button>
                </td>
            </tr>`;

    }
    tbody.innerHTML = table;
    if (dataTable.length) {
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All ${dataTable.length}</button>`
    } else {
        deleteAllBtn.innerHTML = '';
    }
}
showData();

//delete
function deleteData(i) {
    dataTable.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataTable));
    showData();
}

//delete all
function deleteAll() {
    localStorage.clear();
    dataTable.splice(0);
    showData();
}

//update
function updateData(i) {
    title.value = dataTable[i]['title'];
    price.value = dataTable[i]['price'];
    taxes.value = dataTable[i]['taxes'];
    ads.value = dataTable[i]['ads'];
    discount.value = dataTable[i]['discount'];
    total.innerHTML = dataTable[i]['total'];
    category.value = dataTable[i]['category'];
    count.style.display = 'none'
    submit.innerHTML = 'Update';
    submit.style.backgroundColor = '#dbca4f';
    TempVar = i;
    mood = 'update';
    getTotal();
}

//search mood
function getSearchMood(id) {
    searchMood = id;
    let searchInput = document.getElementById('search');
    searchInput.focus();
    searchMood === "title" ? searchInput.placeholder = 'Search by title' : searchInput.placeholder = 'Search by category';
    searchInput.value = '';
}

// search data
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataTable.length; i++) {
        const element = dataTable[i];
        if (value && dataTable[i][searchMood].includes(value.toLowerCase())) {
            tbody.innerHTML =
                table += ` <tr>
                <td>${i}</td>
                <td>${dataTable[i]['title']}</td>
                <td>${dataTable[i]['price']}</td>
                <td>${dataTable[i]['taxes']}</td>
                <td>${dataTable[i]['ads']}</td>
                <td>${dataTable[i]['total']}</td>
                <td>${dataTable[i]['category']}</td>
                <td>
                    <button onclick=updateData(${i}) id="update">update</button>
                </td>
                <td>
                    <button onclick=deleteData(${i}) id="delete">delete</button>
                </td>
            </tr>`;
        }
        tbody.innerHTML = table;

    }
    if (value == '')
        showData();
}

//clean data
