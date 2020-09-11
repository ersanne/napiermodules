<template>
  <v-card class="mx-auto"
          outlined>
    <v-card-title>
      Filters
    </v-card-title>
    <v-card-text>
      <ApolloQuery v-for="(item, i) in filterOptions"
                   :key="i"
                   :query="gql => gql`query ${item.root}($fieldName: ${item.fieldType}) {
                                  ${item.root}(distinct_on: $fieldName) {
                                    ${item.fieldName}
                                  }
                               }`"
                   :variables="{ fieldName: item.fieldName }"
                   :update="data => data[`${item.root}`]"
      >
        <template v-slot="{ result: {data}}">
          <div v-if="data" class="result apollo">
            <v-autocomplete
                v-model="item.selection"
                :items="data"
                :item-text="item.fieldName"
                :label="item.label"
                multiple
                chips
                @input="changeFilterOptions"
            ></v-autocomplete>
          </div>
        </template>
      </ApolloQuery>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ModuleFilters",
  data: () => ({
    filterOptions: [
      {label: 'School', root: 'modules', fieldName: 'school', fieldType: '[modules_select_column!]', selection: []},
      {label: 'Subject', root: 'modules', fieldName: 'subject_area_group', fieldType: '[modules_select_column!]', selection: []},
      {label: 'Location of delivery', root: 'teaching_instances', fieldName: 'delivery_location', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Trimester', root: 'teaching_instances', fieldName: 'trimester', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Term', root: 'teaching_instances', fieldName: 'term', fieldType: '[teaching_instances_select_column!]', selection: []},
      {label: 'Mode of delivery', root: 'teaching_instances', fieldName: 'delivery_mode', fieldType: '[teaching_instances_select_column!]', selection: []},
    ]
  }),
  methods: {
    changeFilterOptions: function () {
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
      this.$emit('filterChanged', filter)
    }
  }
}
</script>

<style scoped>

</style>
