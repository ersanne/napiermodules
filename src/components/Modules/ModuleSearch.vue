<template>
  <div v-if="$apollo.loading">Loading...</div>
  <div v-else>
    <v-row v-for="(module, i) in modules"
           :key="i">
      <v-col cols="12">
        <Module :module="module"></Module>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Module from "@/components/Modules/ModuleCard";

export default {
  name: "ModuleSearch",
  components: {Module},
  props: {
    searchText: String,
    filter: Object,
    sort: Object,
    page: Number,
    pageSize: Number,
  },
  computed: {
    offset: function () {
      return (this.page * this.pageSize) - this.pageSize
    },
  },
  apollo: {
    modules: {
      query() {
        if(this.searchText) {
          return gql`query search_module_code_title($offset: Int!, $limit: Int!, $filter: modules_bool_exp!, $sort: [modules_order_by!], $searchText: String!) {
            search_module_code_title(offset: $offset, limit: $limit, where: $filter, args: {search: $searchText}) {
              code
              title
              scqf_level
              scqf_credit_value
              school
              subject_area_group
            }
          }`
        } else {
          return gql`query modules($offset: Int!, $limit: Int!, $filter: modules_bool_exp!, $sort: [modules_order_by!], $searchText: String!) {
            modules(offset: $offset, limit: $limit, where: $filter, order_by: $sort) {
              code
              title
              scqf_level
              scqf_credit_value
              school
              subject_area_group
            }
          }`
        }
      }
        ,
      variables() {
        return {
          offset: this.offset,
          limit: this.pageSize,
          filter: this.filter,
          sort: this.sort,
          searchText: this.searchText,
        }
      },
      update: data => data.modules || data.search_module_code_title,
    },
  },
}
</script>

<style scoped>

</style>
