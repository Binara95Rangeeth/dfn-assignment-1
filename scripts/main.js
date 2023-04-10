import Datastore from './datastore.js';


addOptionsToDropDown(Datastore.exchangeTypes);
loadData();

setInterval(() => {
    Datastore.updateStockData();
    loadData();
}, 1000);


function addOptionsToDropDown(arr) {
    let select = document.getElementById('exchange');
    let option;

    arr.forEach((value) => {
        option = document.createElement('option');

        option.text = value;
        option.value = value;
        select.add(option);
    });
}


function loadData() {
    const selectedEx = document.getElementById('exchange').value;

    deleteRows();
    addStockDataToTable(Datastore.getStockByExchange(selectedEx));
}


function addStockDataToTable(stocks) {
    const tbody = document.getElementById("stock-table-body");

    if (stocks.length > 0) {
        stocks.forEach((stock) => {
            const tr = document.createElement("tr");
            for (const prop in stock) {
                const td = document.createElement("td");
                td.innerText = stock[prop];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement("tr");
        tr.innerHTML = '<h3>No Data</h3>';
        tbody.appendChild(tr);
    }
}

function deleteRows() {
    document.getElementsByTagName('tbody')[0].innerHTML = "";
}

