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
        <p>
            <template v-for="line in instance.lta_approach">
                {{line}}<br v-bind:key="line">
            </template>
        </p>
        <h3>Formative Assessment:</h3>
        <p>
            <template v-for="line in instance.formative_assessment">
                {{line}}<br v-bind:key="line">
            </template>
        </p>
        <h3>Summative Assessment:</h3>
        <p>
            <template v-for="line in instance.summative_assessment">
                {{line}}<br v-bind:key="line">
            </template>
        </p>
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
                    <tr v-for="(item, i) in instance.student_activity.activities"
                        :key="i">
                        <td>{{item.mode}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.study_hours}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Total Study Hours</td>
                        <td>{{instance.student_activity.total_study_hours}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Expected Total Study Hours for Module</td>
                        <td>{{instance.student_activity.expected_study_hours}}</td>
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
                    <tr v-for="(item, i) in instance.assessment.assessments"
                        :key="i">
                        <td>{{item.assessment_type}}</td>
                        <td>{{item.weighting}}</td>
                        <td>{{item.lo_covered}}</td>
                        <td>{{item.week_due}}</td>
                        <td>{{item.length_hours}}</td>
                        <td>{{item.length_words}}</td>
                    </tr>
                    <tr>
                        <td>Component 1 subtotal</td>
                        <td>{{instance.assessment.component1_subtotal}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Component 2 subtotal</td>
                        <td>{{instance.assessment.component2_subtotal}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Module subtotal</td>
                        <td>{{instance.assessment.module_subtotal}}</td>
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
                    field: item => `<a :href="${item.delivery_staff_member.email}">${item.delivery_staff_member.name}</a>`
                },
                {
                    label: 'Module Organiser',
                    field: item => `<a :href="${item.module_organiser.email}">${item.module_organiser.name}</a>`
                },
            ]
        })
    }
</script>

<style scoped>

</style>