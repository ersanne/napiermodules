<template>
    <ApolloQuery :query="gql => gql`query ModuleByCode($moduleCode: String!) {
  moduleOne(filter: { _id: $moduleCode }) {
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
}
`"
                 :variables="{ moduleCode: moduleCode }"
                 :update="data=> data.moduleOne">
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
                        <h2>{{ data.module_title }}</h2>
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
                                                        {{item.label}}
                                                    </td>
                                                    <td>
                                                        <div v-html="item.field(data)"></div>
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
                                            <v-tab>
                                                Prerequisites
                                            </v-tab>
                                            <v-tab>
                                                Description of module content
                                            </v-tab>
                                            <v-tab>
                                                Learning Outcomes for module
                                            </v-tab>
                                            <v-tab v-if="data.reading_list.length > 0">
                                                Reading List
                                            </v-tab>
                                        </v-tabs>
                                        <v-tabs-items v-model="tab">
                                            <v-tab-item>
                                                <v-card>
                                                    <v-card-text>
                                                        <template v-for="line in data.prerequisites">
                                                            {{line}}<br v-bind:key="line">
                                                        </template>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-card flat>
                                                    <v-card-text>
                                                        <template v-for="line in data.module_content_description">
                                                            {{line}}<br v-bind:key="line">
                                                        </template>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-card flat>
                                                    <v-card-text>
                                                        <template v-for="line in data.learning_outcomes">
                                                            {{line}}<br v-bind:key="line">
                                                        </template>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                            <v-tab-item v-if="data.reading_list.length > 0">
                                                <v-card flat>
                                                    <v-card-text>
                                                        <template v-for="line in data.reading_list">
                                                            {{line}}<br v-bind:key="line">
                                                        </template>
                                                    </v-card-text>
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
                                                        {{instance.term}}, {{instance.trimester}},
                                                        {{instance.delivery_mode}},
                                                        {{instance.partner}}
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
            moduleDetailColumns: [{label: 'Module Title:', field: item => item.module_title},
                {label: 'Module Code:', field: item => item._id},
                {
                    label: 'Module Leader',
                    field: item => `<a :href="${item.module_leader.email}">${item.module_leader.name}</a>`
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