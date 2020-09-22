<template>
  <ApolloQuery :query="gql => gql`query modules($moduleCode: String!) {
  modules(where: {code: {_eq: $moduleCode}}) {
    code
    title
    scqf_level
    scqf_credit_value
    ects_credit_value
    staff_module_leader {
      name
      email
    }
    school
    subject_area_group
    prerequisites_html
    module_content_description_html
    learning_outcomes_html
    reading_list_html
    teaching_instances {
      term
      trimester
      occurrence
      delivery_mode
      delivery_location
      partner
      staff_delivery_staff_member {
        name
        email
      }
      staff_module_organiser {
        name
        email
      }
      lta_approach_html
      formative_assessment_html
      summative_assessment_html
      student_activities {
          mode
          type
          study_hours
      }
      total_study_hours
      expected_total_study_hours
      assessments {
          type
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
`"
               :variables="{ moduleCode: moduleCode }"
               :update="data=> data.modules[0]">
    <template slot-scope="{ result: { data, loading } }">
      <div v-if="loading">
        <v-container>
          <v-row
              align="center"
              justify="center">
            <v-col
                cols="12"
                class="text-center">
              <v-progress-circular
                  indeterminate
                  color="primary"
                  size="50"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else-if="data">
        <v-container>
          <v-row>
            <v-col md="10">
              <h2>{{ data.title }}</h2>
            </v-col>
            <v-col class="hidden-md-and-down" md="2">
              <v-btn
                  color="primary"
                  outlined
                  block
                  :href="`https://www.modules.napier.ac.uk/Module.aspx?ID=${data.code}`">
                View on Napier.ac.uk
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="hidden-lg-and-up" cols="12" align-self="center">
              <v-btn
                  color="primary"
                  outlined
                  block
                  :href="`https://www.modules.napier.ac.uk/Module.aspx?ID=${data.code}`">
                View on Napier.ac.uk
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"
                   md="6">
              <v-row>
                <v-col cols="12">
                  <v-card
                      class="mx-auto">
                    <v-card-title>
                      <h5>Module Details</h5>
                    </v-card-title>
                    <v-card-text>
                      <v-simple-table>
                        <tbody>
                        <tr v-for="(item, i) in moduleDetailColumns" :key="i">
                          <td>
                            {{ item.label }}
                          </td>
                          <td v-html="item.field(data)">
                          </td>
                        </tr>
                        </tbody>
                      </v-simple-table>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-tabs v-model="tab"
                            centered>
                      <v-tab v-if="data.prerequisites_html">
                        Prerequisites
                      </v-tab>
                      <v-tab v-if="data.module_content_description_html">
                        Description of module content
                      </v-tab>
                      <v-tab v-if="data.learning_outcomes_html">
                        Learning Outcomes for module
                      </v-tab>
                      <v-tab v-if="data.reading_list_html">
                        Reading List
                      </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                      <v-tab-item v-if="data.prerequisites_html">
                        <v-card>
                          <v-card-text v-html="data.prerequisites_html"></v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item v-if="data.module_content_description_html">
                        <v-card flat>
                          <v-card-text v-html="data.module_content_description_html"></v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item v-if="data.learning_outcomes_html">
                        <v-card flat>
                          <v-card-text v-html="data.learning_outcomes_html"></v-card-text>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item v-if="data.reading_list_html">
                        <v-card flat>
                          <v-card-text v-html="data.reading_list_html"></v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col
                cols="12"
                md="6">
              <v-row>
                <v-col cols="12">
                  <!--                                    <v-card>-->
                  <!--                                        <v-card-text>-->
                  <v-expansion-panels
                      multiple
                  >
                    <v-expansion-panel
                        v-for="(instance, i) in data.teaching_instances"
                        :key="i"
                    >
                      <v-expansion-panel-header>
                        {{ instance.term }}, {{ instance.trimester }},
                        {{ instance.delivery_mode }},
                        {{ instance.partner }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <ModuleTeachingInstance
                            v-bind:instance="instance"></ModuleTeachingInstance>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <!--                                        </v-card-text>-->
                  <!--                                    </v-card>-->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import ModuleTeachingInstance from "../components/Modules/ModuleTeachingInstance";

export default {
  name: "ModulePage",
  components: {ModuleTeachingInstance},
  props: ['moduleCode'],
  data: () => ({
    tab: null,
    module: {},
    moduleDetailColumns: [{label: 'Module Title:', field: item => item.title},
      {label: 'Module Code:', field: item => item.code},
      {
        label: 'Module Leader',
        field: item => `<a style="text-decoration: none" href="mailto:${item.staff_module_leader.email}">${item.staff_module_leader.name}</a>`
      },
      {label: 'School:', field: item => item.school},
      {label: 'Subject area group:', field: item => item.subject_area_group},
      {label: 'SCQF Level:', field: item => item.scqf_level},
      {label: 'SCQF Credit Value:', field: item => item.scqf_credit_value},
      {label: 'ECTS Credit Value:', field: item => item.ects_credit_value}],
  }),
}
</script>

<style scoped>

</style>
