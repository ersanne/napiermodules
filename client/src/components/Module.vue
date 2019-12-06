<template>
    <v-card class="mx-auto"
            outlined>
        <v-card-title>
            Module title
        </v-card-title>
        <v-card-subtitle>
            School of Computing, Web Technologies
        </v-card-subtitle>
        <v-card-text>
            <div>SCQF Level: 9</div>
            <div>SCQF Credits: 20</div>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" text>
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
        name: "Module"
    }
</script>

<style scoped>

</style>
