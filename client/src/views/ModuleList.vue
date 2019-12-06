<template>
    <v-container>
        <v-row>
            <v-col cols="9">
                <v-row>
                    <v-col cols="12">
                        <Module></Module>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <Module></Module>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <Module></Module>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3">
                <ModuleFilters></ModuleFilters>
            </v-col>
        </v-row>


    </v-container>
</template>

<script>
    import Module from "@/components/Module";
    import ModuleFilters from "@/components/ModuleFilters";

    export default {
        name: "ModuleList",
        components: {ModuleFilters, Module}
    }
</script>

<style scoped>

</style>
