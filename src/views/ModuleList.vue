<template>
  <v-container fluid>
    <v-row>
      <v-col md="1">
      </v-col>
      <v-col cols="12"
             md="3">
        <v-row>
          <v-col cols="12">
            <ModuleFilters v-on:filterChanged="onFilterChanged" :page="page"></ModuleFilters>
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
                item-text="label"
                item-value="query"
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
          <v-col cols="12" md="10">
            <Modules :searchText="searchText" :filter="filter" :sort="sort" :page="page" :pageSize="pageSize"></Modules>
            <ModulePagination v-on:pageChanged="onPageChanged" :filter="filter" :pageSize="pageSize"></ModulePagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModuleFilters from "@/components/Modules/ModuleFilters";
import Modules from "@/components/Modules/Modules";
import ModulePagination from "@/components/Modules/ModulePagination";

export default {
  name: "ModuleList",
  components: {ModulePagination, Modules, ModuleFilters},
  data: () => ({
    page: 1,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 25, 50, 100],
    sort: { title: "asc" },
    sortOptions: [
      { label: "Title Ascending", query: { title: "asc" }},
      { label: "Title Descending", query: { title: "desc" }}
      ],
    filter: {},
    searchText: "",
  }),
  watch: {
    page(){}
  },
  methods: {
    onFilterChanged(newVal) {
      this.filter = newVal
    },
    onPageChanged(newVal) {
      this.page = newVal
    }
  }
}
</script>

<style scoped>

</style>
