<template>
    <v-container>
        <v-row>
            <v-col cols="6">
               {{module.module_title}}
            </v-col>
            <v-col cols="6">

            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        name: "ModulePage",
        data: () => ({
          module: {}
        }),
        apollo: {
            module: {
                query: gql`query {
  moduleOne(filter: { _id: "ACC07101" }) {
    _id
    module_title
    scqf_level
    scqf_credit_value
    ects_credit_value
    module_leader {
      name
      email
    }
    school
    subject_area_group
    prerequisites
    module_content_description
    learning_outcomes
    reading_list
    teaching_instances {
      term
      trimester
      occurrence
      delivery_mode
      delivery_location
      partner
      delivery_staff_member {
        name
        email
      }
      module_organiser {
        name
        email
      }
      lta_approach
      formative_assessment
      summative_assessment
      student_activity {
        activities {
          mode
          type
          study_hours
        }
        total_study_hours
        expected_study_hours
      }
      assessment {
        assessments {
          assessment_type
          weighting
          lo_covered
          week_due
          length_hours
          length_words
        }
        component1_subtotal
        component2_subtotal
        module_subtotal
      }
    }
  }
}`,
                update: data => data.moduleOne
            }
        }
    }
</script>

<style scoped>

</style>