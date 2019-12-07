<template>
    <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="Search Modules"
            placeholder="Start typing to search"
            return-object
    ></v-autocomplete>
</template>

<script>
    export default {
        name: "Search",
        data: () => ({
            descriptionLimit: 60,
            entries: [],
            isLoading: false,
            model: null,
            search: null
        }),
        computed: {
            fields (){
                if(!this.model) return []

                return Object.keys(this.model).map(key => {return {
                    key,
                    value: this.model[key] || 'n/a',
                }})
            },
            items (){
                return this.entries.map(entry => {
                    const Description = entry.Description.length > this.descriptionLimit
                        ? entry.Description.slice(0, this.descriptionLimit) + '...'
                        : entry.Description

                    return Object.assign({},  entry, {Description})
                })
            },
            methods: {
                search () {

                }
            },
        }
    }
</script>

<style scoped>

</style>