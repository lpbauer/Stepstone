<template>
  <div class="companies">
    <p>{{ keyword }}</p>
    <h1>Revenue for Companies in Different Industries</h1>
      <input type="text" v-model="keyword" placeholder="Search Companies"/>
        <table>
          <tr>
            <th>Company</th>
            <th>Industry</th>
            <th>Year</th>
            <th>Revenue</th>
          </tr>
          <tr v-for="company in filteredList">
            <td>{{ company.name }}</td>
            <td>{{ company.industry }}</td>
            <td>{{ company.year }}</td>
            <td>{{ company.revenue }}</td>
          </tr>
        </table>
  </div>
</template>


<script>
  export default {
    name: 'companies',
    data () {
      return {
        keyword: '',
        companies: []
      }
    },
    methods: {

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

</style>
