<template>
  <div class="companies">
    <div class="container-fluid">
      <h1>Company Revenue by Industry</h1>
      <div class="row">
        <div class="col-sm-6">
          <p>Add New Information</p>
          <label for="company">Company Name</label>
          <select  v-model="comname">
            <option v-for="company in companies">
              {{ company.name }}</option>
            </select>
            <label for="industry">Industry</label>
            <select v-model="industry">
              <option>Aerospace</option>
              <option>Banks, Commercial</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Manufacturing</option>
              <option>Oil & Gas</option>
              <option>Technology</option>
            </select>
            <label for="year">Year</label>
            <input class="input-width" type="text" v-model="year">
            <label for="revenue">Revenue</label>
            <input class="input-width" type="text" v-model="revenue">
            <input v-on:click="postnew" class="submit" type="submit" value="Submit">
          </div>
          <div class="col-sm-6 graph">
            <p>Total Revenue by Industry</p>
            <div class="aero-bar"><strong>Aerospace:</strong> {{ totalRevenueObject.aerorev }}</div>
            <div class="bank-bar"><strong>Banks, Commercial:</strong> {{ totalRevenueObject.bankrev }}</div>
            <div class="ed-bar"><strong>Education:</strong> {{ totalRevenueObject.edrev }}</div>
            <div class="health-bar"><strong>Healthcare:</strong> {{ totalRevenueObject.healthrev }}</div>
            <div class="man-bar"><strong>Manufacturing:</strong> {{ totalRevenueObject.manrev }}</div>
            <div class="oil-bar"><strong>Oil & Gas:</strong> {{ totalRevenueObject.oilrev }}</div>
            <div class="tech-bar"><strong>Technology:</strong> {{ totalRevenueObject.techrev }}</div>
          </div>
        </div>
      </div>
      <input class="search" type="text" v-model="keyword" placeholder="Search Companies"/>
      <div class="container-fluid">
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-on:click="comtoggle" v-model="com">Company<span v-if="comup" class="arrow-asc"></span><span v-else class="arrow-dsc"></span></th>
              <th>Industry</th>
              <th>Year</th>
              <th v-on:click="revtoggle" v-model="rev">Revenue<span v-if="revup" class="arrow-asc"></span><span v-else class="arrow-dsc"></span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in filteredList">
              <td>{{ company.name }}</td>
              <td>{{ company.industry }}</td>
              <td>{{ company.year }}</td>
              <td>{{ company.revenue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>


  <script>
  export default {
    name: 'companies',
    data () {
      return {
        keyword: '',
        comname: '',
        year: '',
        industry: '',
        revenue: '',
        rev: true,
        com: true,
        comup: true,
        revup: true,
        companies: [],
        totalRevenueObject: {}
      }
    },
    methods: {
      revtoggle: function () {
        var rev = this.rev
        var revup = this.revup
        var revsort = 'http://jsapi.makespi.com/api/companies/revenue?key=' + (process.env.API_KEY) + '&sort=revenue&sort_order='
        if (rev) {
          this.revup = !revup
          this.rev = !rev
          this.$http.get(revsort + '2')
          .then(function (response) {
            this.companies = response.body.companies
          })
        } else {
          this.revup = !revup
          this.rev = !rev
          this.$http.get(revsort + '1')
          .then(function (response) {
            this.companies = response.body.companies
          })
        }
      },
      comtoggle: function () {
        var comup = this.comup
        var com = this.com
        var comsort = 'http://jsapi.makespi.com/api/companies/revenue?key=' + (process.env.API_KEY) + '=companies&sort_order='
        if (com) {
          this.comup = !comup
          this.com = !com
          this.$http.get(comsort + '2')
          .then(function (response) {
            this.companies = response.body.companies
          })
        } else {
          this.comup = !comup
          this.com = !com
          this.$http.get(comsort + '1')
          .then(function (response) {
            this.companies = response.body.companies
          })
        }
      },
      postnew: function () {
        this.$http.post('http://jsapi.makespi.com/api/companies/revenue?key=' + (process.env.API_KEY), {company: this.comname, year: this.year, revenue: this.revenue, industry: this.industry})
        .then(function (response) {
          alert(response)
        })
      },
      industryRevenue () {
        var all = this.companies
        var bankrev = 0
        var techrev = 0
        var aerorev = 0
        var healthrev = 0
        var edrev = 0
        var manrev = 0
        var oilrev = 0
        for (var i = 0; i < all.length; i++) {
          if (all[i].industry === 'Aerospace') {
            aerorev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Banks, Commercial') {
            bankrev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Education') {
            edrev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Health Care') {
            healthrev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Manufacturing') {
            manrev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Oil & Gas') {
            oilrev += (parseFloat((all[i].revenue).replace(',', '')))
          } else if (all[i].industry === 'Technology') {
            techrev += (parseFloat((all[i].revenue).replace(',', '')))
          }
        }
        var revObject = {aerorev: aerorev.toFixed(2), bankrev: bankrev.toFixed(2), edrev: edrev.toFixed(2), healthrev: healthrev.toFixed(2), manrev: manrev.toFixed(2), oilrev: oilrev.toFixed(2), techrev: techrev.toFixed(2)}
        return revObject
      }
    },
    created: function () {
      this.$http.get('http://jsapi.makespi.com/api/companies/revenue?key=' + (process.env.API_KEY))
      .then(function (response) {
        this.companies = response.body.companies
        this.totalRevenueObject = this.industryRevenue()
      })
    },
    computed: {
      filteredList () {
        return this.companies.filter((company) => {
          return company.name.toLowerCase().includes(this.keyword.toLowerCase())
        })
      }
    }
  }
  </script>

  <style scoped>

  h1 {
    margin-bottom: 5%;
  }

  .arrow-asc {
    margin-left: 5%;
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid black;
    cursor: pointer;
  }

  .arrow-dsc {
    margin-left: 5%;
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
    cursor: pointer;
  }

  .search {
    margin-top: 5%;
    margin-bottom: 5%;
  }

  .submit {
    margin-top: 5%;
    margin-left: 70%;
    border: solid 1px;
    border-radius: 5px;
    border-color: lightgray;
  }

  input {
    border: solid 1px;
    border-radius: 5px;
    border-color: lightgray;
  }

  .container-fluid {
    max-width: 80%;
  }

  td, label {
    text-align: left;
  }

  label {
    margin-top: 2%;
  }

  label, select {
    width: 90%;
  }

  .input-width {
    width: 90%;
    height: 25px;
  }

  .aero-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((5194052.34/15000000)*60%);
  }

  .bank-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((12247517.32/15000000)*60%);
  }

  .ed-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((4701801.02/15000000)*60%);
  }

  .health-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((4967215.89/15000000)*60%);
  }

  .man-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((4909931.72/15000000)*60%);
  }

  .oil-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((5122360.35/15000000)*60%);
  }

  .tech-bar {
    writing-mode: tb-rl;
    display: inline-block;
    width: 12%;
    background-color: lightgray;
    height: calc((13444863.48/15000000)*60%);
  }

  .graph {

  }

  </style>
