<template>
  <ApolloQuery :query="gql => gql`query modules_aggregate($filter: modules_bool_exp!) {
                              modules_aggregate(where: $filter) {
                                aggregate {
                                  count
                                }
                              }
                            }`"
               :variables="{filter: filter}"
               :update="data => data.modules_aggregate.aggregate.count"
               deep
  >
    <template v-slot="{ result: {data}}">
      <v-row>
        <v-col>
          <v-pagination v-if="data"
                        v-model="page"
                        :length="Math.ceil(data / pageSize)"
                        @input="pageChanged"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: "ModulePagination",
  props: {
    filter: Object,
    pageSize: Number
  },
  data: () => ({
    page: 1,
  }),
  methods: {
    pageChanged: function () {
      this.$emit('pageChanged', this.page)
      this.$router.replace({name: 'module-list', query: {...this.$route.query, page: this.page}})
    },
    parseQueryObject: function () {
      if(this.$route.query.page) {
        this.page = parseInt(this.$route.query.page)
        this.pageChanged();
      }
    },
  },
  mounted: function () {
    this.parseQueryObject()
  }
}
</script>

<style scoped>

</style>
