<template>
  <v-card class="mx-auto"
          outlined>
    <v-card-title>
      Filters
    </v-card-title>
    <v-card-text>
      <ApolloQuery v-for="(filterOption, i) in filterOptions"
                   :key="i"
                   :query="gql => gql`query ${filterOption.root}($fieldName: ${filterOption.fieldType}) {
                                  ${filterOption.root}(distinct_on: $fieldName) {
                                    ${filterOption.fieldName}
                                  }
                               }`"
                   :variables="{ fieldName: filterOption.fieldName }"
                   :update="data => data[`${filterOption.root}`]"
      >
        <template v-slot="{ result: {data}}">
          <div v-if="data" class="result apollo">
            <v-autocomplete
                v-model="filterOption.selection"
                :items="data"
                :item-text="filterOption.fieldName"
                :label="filterOption.label"
                multiple
                chips
                @input="changeFilterOptions"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click:close="remove(filterOption, data.item)">
                  {{ data.item[filterOption.fieldName] }}
                </v-chip>
              </template>
            </v-autocomplete>
          </div>
        </template></ApolloQuery>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ModuleFilters",
  props: {
    page: Number,
  },
  data: () => ({
    filterOptions: [
      {label: 'School', root: 'modules', fieldName: 'school', fieldType: '[modules_select_column!]', selection: []},
      {label: 'Subject', root: 'modules', fieldName: 'subject_area_group', fieldType: '[modules_select_column!]', selection: []},
      {label: 'Location of delivery', root: 'teaching_instances', fieldName: 'delivery_location', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Trimester', root: 'teaching_instances', fieldName: 'trimester', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Term', root: 'teaching_instances', fieldName: 'term', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Mode of delivery', root: 'teaching_instances', fieldName: 'delivery_mode', fieldType: '[teaching_instances_select_column!]', selection: []},
    ],
  }),
  computed: {
    console: () => console,
    queryObject() {
      let queryObj = {}
      queryObj.page = this.page
      this.filterOptions.forEach(item => {
        if(item.selection.length > 0) {
          queryObj[item.fieldName] = item.selection
        }
      })
      return queryObj
    }
  },
  methods: {
    changeFilterOptions: function () {
      this.$emit('filterChanged', this.getApolloFilterObject())
      this.$router.replace({name: 'module-list', query: this.queryObject})
    },
    remove: function (filterOption, item) {
      const idx = filterOption.selection.indexOf(item[filterOption.fieldName])
      if(idx >= 0) {
        filterOption.selection.splice(idx, 1)
      }
      this.changeFilterOptions()
    },
    parseQueryObject: function () {
      this.filterOptions.forEach(item => {
        if(Object.keys(this.$route.query).includes(item.fieldName)) {
          item.selection = item.selection.concat(this.$route.query[item.fieldName])
        }
      })
    },
    getApolloFilterObject: function () {
      let filter = {};
      this.filterOptions.forEach(item => {
        if(item.selection.length > 0) {
          if(item.root === 'modules') {
            if(!filter[item.fieldName]) filter[item.fieldName] = {}
            filter[item.fieldName]['_in'] = item.selection
          } else {
            if(!filter[item.root]) filter[item.root] = {}
            if(!filter[item.root][item.fieldName]) filter[item.root][item.fieldName] = {}
            filter[item.root][item.fieldName]['_in'] = item.selection
          }
        }
      });
      return filter
    },
  },
  mounted: function () {
    this.parseQueryObject()
  }
}
</script>

<style scoped>

</style>
