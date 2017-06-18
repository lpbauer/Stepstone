<template>
  <div class="companies">
    <h1>Revenue for Companies in Different Industries</h1>
    <p>Add New Information</p>
    <div class="add-company">
      <input type="text" name="" v-model="comname" placeholder="Company Name">
      <input type="text" name="" v-model="industry" placeholder="Industry">
      <input type="text" name="" v-model="year" placeholder="Year">
      <input type="text" name="" v-model="revenue" placeholder="Revenue">
      <input v-on:click="postnew" class="submit" type="submit" name="" value="Submit">
    </div>
    <input class="search" type="text" v-model="keyword" placeholder="Search Companies"/>
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
        console.log(this.comname, this.revenue)
      }
    },
    created: function () {
      this.$http.get('http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323')
        .then(function (response) {
          this.companies = response.body.companies
        })
      // this.$http.post('http://jsapi.makespi.com/api/companies/revenue?key=508bce9c8cf114ded87959c536fd2323')
      //   .then(function (response) {
      //     console.log(response)
      //   })
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
    border: solid 1px;
    border-radius: 10%;
    border-color: lightgray;
  }

</style>
