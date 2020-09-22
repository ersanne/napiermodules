<template>
  <v-card class="mx-auto"
          outlined>
    <v-card-title>
      <span v-text="module.title"></span>
    </v-card-title>
    <v-card-subtitle>
      <span v-text="module.code"></span>
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
          outlined
          text
          :to="{name:'module-page', params: {moduleCode: module.code}}">
        View Details
      </v-btn>
      <v-btn
          color="primary"
          text
          :href="`https://www.modules.napier.ac.uk/Module.aspx?ID=${module.code}`">
        View on Napier.ac.uk
      </v-btn>
<!--      <v-btn v-if="moduleIsSaved"-->
<!--             color="primary"-->
<!--             text-->
<!--             @click="unsaveModule()">-->
<!--        Unsave-->
<!--      </v-btn>-->
<!--      <v-btn v-else-->
<!--             color="primary"-->
<!--             text-->
<!--             @click="saveModule()">-->
<!--        Save-->
<!--      </v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "Module",
  props: {
    module: Object,
  },
  // computed: {
  //   moduleIsSaved () {
  //     return this.$store.getters.moduleIsSaved(module.code)
  //   }
  // },
  // methods: {
  //   saveModule() {
  //     this.$store.dispatch('saveModule', this.module.code)
  //   },
  //   unsaveModule() {
  //     this.$store.dispatch('removeSavedModule', this.module.code)
  //   }
  // }
}
</script>

<style scoped>

</style>
