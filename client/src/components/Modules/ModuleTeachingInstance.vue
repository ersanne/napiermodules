<template>
    <div>
        <v-simple-table>
            <tbody>
            <tr v-for="(item, i) in instanceDetailColumns" :key="i">
                <td>
                    {{item.label}}
                </td>
                <td>
                    <div v-html="item.field(instance)"></div>
                </td>
            </tr>
            </tbody>
        </v-simple-table>
        <h3>Learning, Teaching and Assessment (LTA) Approach:</h3>
        <p v-html="instance.lta_approach_html"></p>
        <h3>Formative Assessment:</h3>
        <p v-html="instance.formative_assessment_html"></p>
        <h3>Summative Assessment:</h3>
        <p v-html="instance.summative_assessment_html"></p>
        <v-tabs
                v-model="tab"
                centered>
            <v-tab>
                Student Activity (Notional Equivalent Study Hours (NESH))
            </v-tab>
            <v-tab>
                Assessment
            </v-tab>
        </v-tabs>
        <v-tabs-items
                v-model="tab">
            <v-tab-item>
                <v-simple-table>
                    <thead>
                    <tr>
                        <th>Mode of activity</th>
                        <th>Learning & Teaching Activity</th>
                        <th>NESH (Study Hours)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in instance.student_activities"
                        :key="i">
                        <td>{{item.mode}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.study_hours}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Total Study Hours</td>
                        <td>{{instance.total_study_hours}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Expected Total Study Hours for Module</td>
                        <td>{{instance.expected_total_study_hours}}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-tab-item>
            <v-tab-item>
                <v-simple-table>
                    <thead>
                    <tr>
                        <td>Type of Assessment</td>
                        <td>Weighting %</td>
                        <td>LOs covered</td>
                        <td>Week due</td>
                        <td>Length in hours</td>
                        <td>Length in words</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in instance.assessments"
                        :key="i">
                        <td>{{item.type}}</td>
                        <td>{{item.weighting}}</td>
                        <td>{{item.lo_covered}}</td>
                        <td>{{item.week_due}}</td>
                        <td>{{item.length_hours}}</td>
                        <td>{{item.length_words}}</td>
                    </tr>
                    <tr>
                        <td>Component 1 subtotal</td>
                        <td>{{instance.component1_subtotal}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Component 2 subtotal</td>
                        <td>{{instance.component2_subtotal}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Module subtotal</td>
                        <td>{{instance.module_subtotal}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    export default {
        name: "ModuleTeachingInstance",
        props: {
            instance: Object
        },
        data: () => ({
            tab: null,
            instanceDetailColumns: [
                {label: 'Occurrence', field: item => item.occurrence},
                {label: 'Primary mode of delivery', field: item => item.delivery_mode},
                {label: 'Location of delivery', field: item => item.delivery_location},
                {label: 'Partner', field: item => item.partner},
                {
                    label: 'Member of staff responsible for delivering module',
                    field: item => `<a :href="${item.staff_delivery_staff_member.email}">${item.staff_delivery_staff_member.name}</a>`
                },
                {
                    label: 'Module Organiser',
                    field: item => `<a :href="${item.staff_module_organiser.email}">${item.staff_module_organiser.name}</a>`
                },
            ]
        })
    }
</script>

<style scoped>

</style>
