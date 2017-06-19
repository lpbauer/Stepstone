<template>
  <div class="companies">
    <div class="container-fluid">
      <h1>Company Revenue by Industry</h1>
      <p>Add New Information</p>
      <div class="row">
        <div class="col-sm-4">
          <label for="company">Company Name</label>
          <select  v-model="comname">
            <option v-for="company in companies">
              {{ company.name }}</option>
            </select>
          </div>
          <div class="col-sm-2">
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
          </div>
          <div class="col-sm-2">
            <label for="year">Year</label>
            <input class="input-width" type="text" v-model="year">
          </div>
          <div class="col-sm-2">
            <label for="revenue">Revenue</label>
            <input class="input-width" type="text" v-model="revenue">
          </div>
          <div class="col-sm-2">
            <label for="submit"></label>
            <input v-on:click="postnew" class="submit" type="submit" value="Submit">
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
        areorev: '',
        edrev: '',
        techrev: '',
        bankrev: '',
        healthrev: '',
        manrev: '',
        oilrev: '',
        rev: true,
        com: true,
        comup: true,
        revup: true,
        companies: [],
        totalRevenueObject: {},
        revObject: {}
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
        var revObject = {aerorev, bankrev, edrev, healthrev, manrev, oilrev, techrev}
        console.log(revObject)
        return revObject
        // console.log('aerorev = ' + aerorev + ' Banks = ' + bankrev + ' Ed = ' + edrev + ' Health = ' + healthrev + ' Man = ' + manrev + ' Oil = ' + oilrev + ' Tech = ' + techrev)
      }
    },
    created: function () {
      this.$http.get('http://jsapi.makespi.com/api/companies/revenue?key=' + (process.env.API_KEY))
      .then(function (response) {
        this.totalRevenueObject = this.industryRevenue()
        this.companies = response.body.companies
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
    margin-top: 15%;
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

  label, select {
    display: block;
  }

  .input-width {
    width: 99%;
    height: 25px;
  }

  </style>
