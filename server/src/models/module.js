import mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import {composeWithMongoose} from 'graphql-compose-mongoose';

export const ActivitySchema = new Schema({
    mode: String,
    type: String,
    study_hours: String
});

export const AssessmentSchema = new Schema({
    assessment_type: String,
    weighting: String,
    lo_covered: String,
    week_due: String,
    length_hours: String,
    length_words: String
});

export const ModuleSchema = new Schema({
        _id: String,
        module_title: String,
        scqf_level: String,
        scqf_credit_value: String,
        ects_credit_value: String,
        module_leader: {
            name: String,
            email: String
        },
        school: String,
        subject_area_group: String,
        prerequisites: [String],
        module_content_description: [String],
        learning_outcomes: [String],
        reading_list: [String],
        teaching_instances: [{
            term: String,
            trimester: String,
            occurrence: String,
            delivery_mode: String,
            delivery_location: String,
            partner: String,
            delivery_staff_member: {
                name: String,
                email: String
            },
            module_organiser: {
                name: String,
                email: String
            },
            lta_approach: [String],
            formative_assessment: [String],
            summative_assessment: [String],
            student_activity: {
                activities: [ActivitySchema],
                total_study_hours: String,
                expected_study_hours: String
            },
            assessment: {
                assessments: [AssessmentSchema],
                component1_subtotal: String,
                component2_subtotal: String,
                module_subtotal: String
            }
        }]
    },
    {
        collection: "modules"
    }
);

ModuleSchema.plugin(timestamps);
ModuleSchema.index({name: 'text', 'module_title': 'text'});

export const Module = mongoose.model('Module', ModuleSchema);
export const ModuleTC = composeWithMongoose(Module);