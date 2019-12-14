<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12"
                   md="3">
                <v-row>
                    <v-col cols="12">
                        <ModuleFilters></ModuleFilters>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12"
                   md="9">
                <v-row v-for="(module, i) in modules"
                       :key="i">
                    <v-col cols="12">
                        <Module :module="module"></Module>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>


    </v-container>
</template>

<script>
    import Module from "@/components/Modules/ModuleCard";
    import ModuleFilters from "@/components/Modules/ModuleFilters";
    import gql from 'graphql-tag'

    const pageSize = 10;

    export default {
        name: "ModuleList",
        components: {ModuleFilters, Module},
        apollo: {
            modules: {
                query: gql`query modulesPage ($page: Int!, $pageSize: Int!) {
                    modulePagination(page: $page, perPage: $pageSize) {
                        items {
                            _id
                            module_title
                            scqf_level
                            scqf_credit_value
                            school
                            subject_area_group
                        }
                    }
                }`,
                update: data => data.modulePagination.items,
                variables: {
                    page: 1,
                    pageSize,
                }
            }
        }
    }
</script>

<style scoped>

</style>
