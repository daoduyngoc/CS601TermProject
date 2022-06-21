const { createApp } = Vue

const depauw = ["../assets/pics/DePauw.webp", "../assets/pics/depauw_2.jpeg"]
const boston = ["../assets/pics/BU.png", "../assets/pics/bu_2.jpeg"]
const data_url = "../assets/models/class.json"

createApp({
    data() {
        return {
            depauw,
            boston,
            depauw_image: depauw[0],
            boston_image: boston[0],
        }
    },
    methods: {
        updateDepauw() {
            this.depauw_image = this.depauw[1];
        },
        resetDepauw() {
            this.depauw_image = this.depauw[0];
        },
        updateBoston() {
            this.boston_image = this.boston[1];
        },
        resetBoston() {
            this.boston_image = this.boston[0];
        },
        loadData() {
            fetch(data_url)
                .then(res => res.json())
                .then(data => {
                    this.createTable(data)
                })
        },
        createTable(data) {
            //Create a HTML Table element.
            const table = document.createElement("TABLE");

            //Add the header row.
            let row = table.insertRow(-1);
            for (let key in data[0]) {
                let headerCell = document.createElement("TH");
                headerCell.innerHTML = this.capitalizeString(key);
                row.appendChild(headerCell);
            }

            // Add the data rows.
            for (let d of data) {
                row = table.insertRow(-1);
                for (let key in d) {
                    let cell = row.insertCell(-1);
                    cell.innerHTML = d[key];
                }
            }

            const dataTable = document.getElementById("dataTable");
            dataTable.innerHTML = "";
            dataTable.appendChild(table);
        },
        capitalizeString(string) {
            return string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
    }
}).mount('#education')
