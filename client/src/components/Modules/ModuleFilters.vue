<template>
    <v-card class="mx-auto"
            outlined>
        <v-card-title>
            Filters
        </v-card-title>
        <v-card-text>
            <v-list>
                <v-list-group v-for="(item, i) in filterOptions"
                              :key="i">
                    <template v-slot:activator>
                        <v-list-item-title>{{item.label}}</v-list-item-title>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(choice, i) in item.choices"
                                :key="i"
                        >
                            <v-list-item-content>
                                <v-checkbox :label="choice"></v-checkbox>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-list-group>
            </v-list>
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
