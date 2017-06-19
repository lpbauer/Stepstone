<template>
  <div class="companies">
    <div class="container-fluid">
      <h1>Company Revenue by Industry</h1>
      <p>Add New Information</p>
      <div class="row">
        <div class="col-sm-4">
          <label for="company">Company Name</label>
          <select>
            <option v-for="company in companies">
              {{ company.name }}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <label for="industry">Industry</label>
            <select>
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
            <input type="text">
          </div>
          <div class="col-sm-2">
            <label for="revenue">Revenue</label>
            <input type="text">
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
        rev: true,
        com: true,
        comup: true,
        revup: true,
        companies: []
      }
    },
    methods: {
      revtoggle: function () {
        var rev = this.rev
        var revup = this.revup
        var revsort = 'http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323&sort=revenue&sort_order='
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
        var comsort = 'http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323&sort=companies&sort_order='
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
        this.$http.post('http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323', {company: this.comname, year: this.year, revenue: this.revenue, industry: this.industry}, function (response) {
          alert(response)
        })
      }
    },
    created: function () {
      this.$http.get('http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323')
      .then(function (response) {
        this.companies = response.body.companies
      })
    },
    computed: {
      filteredList () {
        return this.companies.filter((company) => {
          return company.name.toLowerCase().includes(this.keyword.toLowerCase())
        })
      },
      industryRevenue () {
        console.log(this.companies)
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
  }

  .arrow-dsc {
    margin-left: 5%;
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
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

  </style>
