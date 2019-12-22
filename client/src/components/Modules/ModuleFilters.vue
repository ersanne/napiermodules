<template>
    <v-card class="mx-auto"
            outlined>
        <v-card-title>
            Filters
        </v-card-title>
        <v-card-text>
            <ApolloQuery v-for="(item, i) in filterOptions"
                         :key="i"
                         :query="gql => gql`query ($fieldName: String!) {
                            moduleDistinct(fieldName: $fieldName)
                         }`"
                         :variables="{ fieldName: item.fieldName }"
                         :update="data => data.moduleDistinct"
            >
                <template v-slot="{ result: {data}}">
                    <div v-if="data" class="result apollo">
                        <v-autocomplete
                                v-model="item.selection"
                                :items="data"
                                :label="item.label"
                                multiple
                                chips
                                @input="changeFilterOptions"
                        >
                        </v-autocomplete>
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
            filter: {},
            filterOptions: [
                {label: 'School', fieldName: 'school', selection: []},
                {label: 'Subject', fieldName: 'subject_area_group', selection: []},
                {label: 'Location of delivery', fieldName: 'teaching_instances.delivery_location', selection: []},
                {label: 'Trimester', fieldName: 'teaching_instances.trimester', selection: []},
                {label: 'Term', fieldName: 'teaching_instances.term', selection: []},
                {label: 'Mode of delivery', fieldName: 'teaching_instances.delivery_mode', selection: []},
            ]
        }),
        methods: {
            changeFilterOptions: function () {
                let filter = { AND: []};
                this.filterOptions.forEach(item => {
                    if(item.selection.length > 0){
                        let fieldObject = {OR: []}
                        item.selection.forEach(selection => {
                            let selectionObject = {};
                            let splitFieldName = item.fieldName.split(".");
                            if(splitFieldName.length === 2){
                                selectionObject[splitFieldName[0]] = {};
                                selectionObject[splitFieldName[0]][splitFieldName[1]] = selection;
                            }else{
                                selectionObject[splitFieldName[0]] = selection;
                            }
                            fieldObject.OR.push(selectionObject)
                        })
                        filter.AND.push(fieldObject)
                    }
                });
                this.$emit('input', filter)
            }
        }
    }
</script>

<style scoped>

</style>
