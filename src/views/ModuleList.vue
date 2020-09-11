<template>
  <v-container fluid>
    <v-row>
      <v-col md="1">
      </v-col>
      <v-col cols="12"
             md="3">
        <v-row>
          <v-col cols="12">
            <ModuleFilters v-model="filter" v-on:filterChanged="onFilterChanged"></ModuleFilters>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12"
             md="8">
        <v-row>
          <v-col cols="12"
                 md="7">
            <v-text-field
                v-model="searchText"
                label="Type to search"
            ></v-text-field>
          </v-col>
          <v-col cols="6"
                 md="2">
            <v-select
                v-model="sort"
                :items="sortOptions"
                label="Sort by"></v-select>
          </v-col>
          <v-col cols="6"
                 md="1">
            <v-select
                v-model="pageSize"
                :items="pageSizes"
                label="Show per page"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <ApolloQuery v-if="searchText" :query="gql => gql`query search_module_code_title($offset: Int!, $limit: Int!, $searchText: String!) {
                search_modules(args: {search: $searchText}) {
                    code
                    title
                    scqf_level
                    scqf_credit_value
                    school
                    subject_area_group
                  }
                }`"
                         :variables="{ offset: offset, limit: pageSize, searchText: searchText }"
                         :update="data => data.search_modules"
                         deep
            >
              <template v-slot="{ result: {data}}">
                <div v-if="data" class="result apollo">
                  <v-row v-for="(module, i) in data"
                         :key="i">
                    <v-col cols="12">
                      <Module :module="module"></Module>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </ApolloQuery>
            <ApolloQuery v-else :query="gql => gql`query modules($offset: Int!, $limit: Int!, $filter: modules_bool_exp!) {
                    modules(offset: $offset, limit: $limit, where: $filter) {
                            code
                            title
                            scqf_level
                            scqf_credit_value
                            school
                            subject_area_group
                    }
                }`"
                         :variables="{offset: offset, limit: pageSize, filter: filter}"
                         :update="data => data.modules"
                         deep
            >
              <template v-slot="{ result: {data}}">
                <div v-if="data" class="result apollo">
                  <v-row v-for="(module, i) in data"
                         :key="i">
                    <v-col cols="12">
                      <Module :module="module"></Module>
                    </v-col>
                  </v-row>
                </div>
              </template>
            </ApolloQuery>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Module from "@/components/Modules/ModuleCard";
import ModuleFilters from "@/components/Modules/ModuleFilters";

export default {
  name: "ModuleList",
  components: {ModuleFilters, Module},
  data: () => ({
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 25, 50, 100],
    sort: ["Title Ascending"],
    sortOptions: ["Title Ascending", "Title Descending"],
    filter: {},
    searchText: "",
  }),
  computed: {
    offset: function () {
      return (this.page * this.pageSize) - this.pageSize
    },
  },
  methods: {
    onFilterChanged(newVal) {
      this.filter = newVal
    }
  }
}
</script>

<style scoped>

</style>
