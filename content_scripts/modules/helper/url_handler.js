/* eslint-disable no-unused-vars */

// Generate Cases Using Below Function
function generateCasesFromJson(tests) {
    const obj = {};
    tests.forEach((ele) => {
        obj[ele.name] =
            `${ele.courseId}/assessments/${ele._id}/${ele.assessmentType}`;
    });
    console.log(obj);
}

function getUrlByTestName(testName) {
    const origin = 'https://cdcracker-backend.onrender.com/courses/';
    const localOrigin = 'assets/tests/';

    const testUrls = {
        // 2027_DBMS Preparatory Course_Level 1
        'PAT_DBMS_INTRODUCTION TO DBMS_MCQ':
            '6a15995d1f5b8ad919986e32/assessments/6a1599aa1f5b8ad919986e33/mcq',
        'PAT_DBMS_ER MODELLING_MCQ':
            '6a15995d1f5b8ad919986e32/assessments/6a159b9c1f5b8ad919986e3e/mcq',
        PAT_DBMS_NORMALAIZATION_MCQ:
            '6a15995d1f5b8ad919986e32/assessments/6a159ca31f5b8ad919986e49/mcq',
        PAT_DBMS_DDL_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15a3da977f8342a2091759/mcq',
        PAT_DBMS_DDL_COD_PA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15a40d977f8342a2091764/coding',
        PAT_DBMS_DDL_COD_FA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15d4fa779ff3355db9dcb9/coding',
        PAT_DBMS_DML_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15d671779ff3355db9dcbc/mcq',
        PAT_DBMS_DML_COD_PA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15d756779ff3355db9dcc7/coding',
        PAT_DBMS_DML_COD_FA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15d908779ff3355db9dccb/coding',
        PAT_DBMS_Opeartors_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a15da4e779ff3355db9dcce/mcq',
        PAT_DBMS_OPERATORS_COD_PA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a17d30ae6a86e99628e9f46/coding',
        PAT_DBMS_OPERATORS_COD_FA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a17d510e6a86e99628e9f4a/coding',
        PAT_DBMS_AF_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a17d672e6a86e99628e9f4d/mcq',
        'PAT_DBMS_AGGREGATE FUNCTIONS_COD_PA_L1':
            '6a15995d1f5b8ad919986e32/assessments/6a17db308556eeb77e9091de/coding',
        'PAT_DBMS_AGGREGATE FUNCTIONS_COD_FA_L1':
            '6a15995d1f5b8ad919986e32/assessments/6a17dcfd8556eeb77e9091e2/coding',
        PAT_DBMS_SF_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a1810b98556eeb77e9091e5/mcq',
        'PAT_DBMS_STRING FUNCTIONS_COD_PA_L1':
            '6a15995d1f5b8ad919986e32/assessments/6a1813a18556eeb77e9091f0/coding',
        'PAT_DBMS_STRING FUNCTIONS_COD_L1_FA':
            '6a15995d1f5b8ad919986e32/assessments/6a1816468556eeb77e9091f4/coding',
        PAT_DBMS_JOINS_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a1816868556eeb77e9091f7/mcq',
        PAT_DBMS_JOINS_COD_PA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a181add8556eeb77e909202/coding',
        PAT_DBMS_JOINS_COD_FA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a181bd18556eeb77e909206/coding',
        PAT_DBMS_SUBQUERY_MCQ_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a181cf38556eeb77e909209/mcq',
        PAT_DBMS_SUBQUERY_COD_PA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a181e8d8556eeb77e909214/coding',
        PAT_DBMS_SUBQUERY_COD_FA_L1:
            '6a15995d1f5b8ad919986e32/assessments/6a18201b8556eeb77e909218/coding',
        // 2027_DBMS Preparatory Course_Level 1
        //
        // 2027_Aptitude Preparatory Course
        'Prep course_Number System_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a153295342105c4aa6bcefe/mcq',
        'Prep course_Number System_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a153302342105c4aa6bcf1d/mcq',
        'Prep course_Number System_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a153370342105c4aa6bcf3c/mcq',
        'Prep course_Percentages_SI and CI_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a153ce4342105c4aa6bcf5b/mcq',
        'Prep course_Percentages_SI and CI_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a153d14342105c4aa6bcf7a/mcq',
        'Prep course_Percentages_SI and CI_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a153d54342105c4aa6bcf99/mcq',
        'Prep course_Time and Work_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a153def342105c4aa6bcfb8/mcq',
        'Prep course_Time and Work_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a153e29342105c4aa6bcfd7/mcq',
        'Prep course_Time and Work_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a153e65342105c4aa6bcff6/mcq',
        'Prep course_Time Speed and Distance_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a153f6d342105c4aa6bd015/mcq',
        'Prep course_Time Speed and Distance_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a153f94342105c4aa6bd034/mcq',
        'Prep course_Time Speed and Distance_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a153fd0342105c4aa6bd053/mcq',
        'Prep course_Profit and Loss_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154014342105c4aa6bd072/mcq',
        'Prep course_Profit and Loss_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154479342105c4aa6bd091/mcq',
        'Prep course_Profit and Loss_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1544d0342105c4aa6bd0b0/mcq',
        'Prep course_Probability_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a15456c342105c4aa6bd0cf/mcq',
        'Prep course_Probability_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1545a5342105c4aa6bd0ee/mcq',
        'Prep course_Probability_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1545cd342105c4aa6bd10d/mcq',
        'Prep course_Permutation and Combination_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a1546a9342105c4aa6bd12c/mcq',
        'Prep course_Permutation and Combination_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1546d0342105c4aa6bd14b/mcq',
        'Prep course_Permutation and Combination_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1546f0342105c4aa6bd16a/mcq',
        'Prep course_Ratios and Proportion and Partnership_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a15471d342105c4aa6bd189/mcq',
        'Prep course_Ratios and Proportion and Partnership_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154747342105c4aa6bd1a8/mcq',
        'Prep course_Ratios and Proportion and Partnership_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154766342105c4aa6bd1c7/mcq',
        'Prep course_Averages and Ages_Level 1 Course':
            '6a153257342105c4aa6bcefd/assessments/6a1547cb342105c4aa6bd1e6/mcq',
        'Prep course_Averages and Ages_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1547fc342105c4aa6bd205/mcq',
        'Prep course_Averages and Ages_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154966342105c4aa6bd224/mcq',
        'Prep course_Reading comprehension_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154b0e342105c4aa6bd243/mcq',
        'Prep course_Reading comprehension_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154b3f342105c4aa6bd262/mcq',
        'Prep course_Reading comprehension_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154b6d342105c4aa6bd281/mcq',
        'Prep course_Sentence correction_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154b91342105c4aa6bd2a0/mcq',
        'Prep course_Sentence correction_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154bb9342105c4aa6bd2bf/mcq',
        'Prep course_Sentence correction_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154bda342105c4aa6bd2de/mcq',
        'Prep course_Sentence completion_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154c03342105c4aa6bd2fd/mcq',
        'Prep course_Sentence completion_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154c24342105c4aa6bd31c/mcq',
        'Prep course_Sentence completion_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154c4b342105c4aa6bd33b/mcq',
        'Prep course_Para jumbles_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154c6e342105c4aa6bd35a/mcq',
        'Prep course_Para jumbles_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154c8e342105c4aa6bd379/mcq',
        'Prep course_Para jumbles_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154cc4342105c4aa6bd398/mcq',
        'Prep course_Articles and prepositions_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154e20342105c4aa6bd3b7/mcq',
        'Prep course_Articles and prepositions_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154e4d342105c4aa6bd3d6/mcq',
        'Prep course_Articles and prepositions_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154e72342105c4aa6bd3f5/mcq',
        'Prep course_Vocabulary_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154f34342105c4aa6bd414/mcq',
        'Prep course_Vocabulary_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154f53342105c4aa6bd433/mcq',
        'Prep course_Vocabulary_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154f71342105c4aa6bd452/mcq',
        'Prep course_Voices and speech_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a154f97342105c4aa6bd471/mcq',
        'Prep course_Voices and speech_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a154fc3342105c4aa6bd490/mcq',
        'Prep course_Voices and speech_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a154ff4342105c4aa6bd4af/mcq',
        'Prep course_Coding and decoding_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a155078342105c4aa6bd4ce/mcq',
        'Prep course_Coding and decoding_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a155099342105c4aa6bd4ed/mcq',
        'Prep course_Coding and decoding_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1550bc342105c4aa6bd50c/mcq',
        'Prep course_Direction_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a1550e6342105c4aa6bd52b/mcq',
        'Prep course_Direction_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a155110342105c4aa6bd54a/mcq',
        'Prep course_Direction_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a155130342105c4aa6bd569/mcq',
        'Prep course_Seating Arrangement_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a1588319be1529b8af3bb80/mcq',
        'Prep course_Seating Arrangement_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1588649be1529b8af3bb9f/mcq',
        'Prep course_Seating Arrangement_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1588879be1529b8af3bbbe/mcq',
        'Prep course_Blood relation_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a1588ed9be1529b8af3bbdd/mcq',
        'Prep course_Blood relation_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1589179be1529b8af3bbfc/mcq',
        'Prep course_Blood relation_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a15893f9be1529b8af3bc1b/mcq',
        'Prep course_Series_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a15897f9be1529b8af3bc3a/mcq',
        'Prep course_Series_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a1589a39be1529b8af3bc59/mcq',
        'Prep course_Series_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a1589be9be1529b8af3bc78/mcq',
        'Prep course_Data sufficiency_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a1589e99be1529b8af3bc97/mcq',
        'Prep course_Data sufficiency_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158a2a9be1529b8af3bcb6/mcq',
        'Prep course_Data sufficiency_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158a589be1529b8af3bcd5/mcq',
        'Prep course_Data Interpretation_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a158a7b9be1529b8af3bcf4/mcq',
        'Prep course_Data Interpretation_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158a9a9be1529b8af3bd13/mcq',
        'Prep course_Data Interpretation_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158abc9be1529b8af3bd32/mcq',
        'Prep course_Syllogism_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a158bed9be1529b8af3bd52/mcq',
        'Prep course_Syllogism_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158c0e9be1529b8af3bd71/mcq',
        'Prep course_Syllogism_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158c2c9be1529b8af3bd90/mcq',
        'Prep course_Pipes and cisterns_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a158c739be1529b8af3bdaf/mcq',
        'Prep course_Pipes and cisterns_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158c969be1529b8af3bdc4/mcq',
        'Prep course_Pipes and cisterns_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158ccc9be1529b8af3bdd9/mcq',
        'Prep course_Boats and streams_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a158cf29be1529b8af3bdee/mcq',
        'Prep course_Boats and streams_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158d0e9be1529b8af3be03/mcq',
        'Prep course_Boats and streams_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158d2f9be1529b8af3be18/mcq',
        'Prep course_Mixtures and Alligations_Level 1':
            '6a153257342105c4aa6bcefd/assessments/6a158d539be1529b8af3be2d/mcq',
        'Prep course_Mixtures and Alligations_Level 2':
            '6a153257342105c4aa6bcefd/assessments/6a158d7a9be1529b8af3be4c/mcq',
        'Prep course_Mixtures and Alligations_Level 3':
            '6a153257342105c4aa6bcefd/assessments/6a158d9f9be1529b8af3be6b/mcq',
        // 2027_Aptitude Preparatory Course
    };

    const currUrl = testUrls[testName];
    if (currUrl !== undefined) {
        return origin + currUrl;
    } else {
        return localOrigin + testName + ' Answers.json';
    }
}
