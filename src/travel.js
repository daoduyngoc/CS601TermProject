const { createApp } = Vue
const country_url = "../assets/models/countries.json"

createApp({
    data() {
        return {
            result: {},
            country_data: [],
            input: ""
        }
    },
    methods: {
        loadData() {
            fetch(country_url)
                .then(res => res.json())
                .then(data => {
                    this.country_data = data['countries']['country'];
                })
        },
        searchInput() {
            this.result = {};
            this.country_data.map( country => {
                    if (this.input.length > 0
                        && (country['countryName'].toUpperCase() === this.input.toUpperCase()
                            || country['capital'].toUpperCase() === this.input.toUpperCase())) {
                        this.result = country;
                    }
                }
            )
        }
    },
    // Load country data before mounting begins
    beforeMount(){
        this.loadData();
    },
}).mount('#country')
