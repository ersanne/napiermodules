<template>
    <v-card class="mx-auto"
            outlined>
        <v-card-title>
            <span v-text="module.module_title"></span>
        </v-card-title>
        <v-card-subtitle>
            <span v-text="module._id"></span>
        </v-card-subtitle>
        <v-card-text>
            <span v-text="module.school"></span> | <span v-text="module.subject_area_group"></span>
            <br>
            SCQF Level: <span v-text="module.scqf_level"></span> |
            SCQF Credits: <span v-text="module.scqf_credit_value"></span>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    color="primary"
                    text
                    :to="{name:'module-page', params: {moduleCode: module._id}}">
                View Details
            </v-btn>
            <v-btn color="primary" text>
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Module",
        props: {
            module: Object,
        },
    }
</script>

<style scoped>

</style>
