<template>
    <v-card class="mx-auto"
            outlined>
        <v-card-title>
            Filters
        </v-card-title>
        <v-card-text>
            <v-select
                    v-for="(item, i) in filterOptions"
                    :key="i"
                    v-model="item.selection"
                    :items="item.choices"
                    :label="item.label"
                    multiple
                    chips
            >
            </v-select>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "ModuleFilters",
        data: () => ({
            filterOptions: [
                {label: 'School', choices: ['School 1', 'School 2']},
                {label: 'Subject', options: 'TODO'},
                {label: 'Location of delivery', options: 'TODO'},
                {label: 'Trimester', options: 'TODO'},
                {label: 'Term', options: 'TODO'},
                {label: 'Mode of delivery', options: 'TODO'},
            ]
        })
    }
</script>

<style scoped>

</style>
