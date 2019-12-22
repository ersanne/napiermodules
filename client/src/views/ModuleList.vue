<template>
    <v-container fluid>
        <v-row>
            <v-col md="1">
            </v-col>
            <v-col cols="12"
                   md="3">
                <v-row>
                    <v-col cols="12">
                        <ModuleFilters v-model="filter" @change="filterChanged"></ModuleFilters>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12"
                   md="8">
                <v-row>
                    <v-col cols="12"
                    md="7">
                        <v-text-field
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
                        <ApolloQuery :query="gql => gql`query modulePagination ($page: Int!, $pageSize: Int!, $filter: FilterFindManyModuleInput) {
                    modulePagination(page: $page, perPage: $pageSize, filter: $filter) {
                        items {
                            _id
                            module_title
                            scqf_level
                            scqf_credit_value
                            school
                            subject_area_group
                        }
                    }
                }`"
                                     :variables="{page: page, pageSize: pageSize, filter: filter}"
                                     :update="data => data.modulePagination.items"
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
            sortOptions: ["Title Ascending","Title Descending"],
            filter: {},
        }),
        methods: {
            filterChanged(newVal) {
                this.filter = newVal
            }
        }
    }
</script>

<style scoped>

</style>
