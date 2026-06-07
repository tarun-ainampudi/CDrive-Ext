// Generate Cases Using Below Function
function generateCasesFromJson(tests) {
    let str = '';
    tests.forEach(ele => {
        if (ele.assessmentType === 'mcq') {
            str += `case "${ele.name}":\nreturn origin + `
                + `"${ele.courseId}/"\n+ "assessments/${ele._id}/${ele.assessmentType}";\n`
        }
    });
    console.log(str.trim());
}

function getUrlByTestName(testName) {
    const origin = "https://cdcracker-backend"
        + ".onrender.com/courses/";
    switch (testName) {
        //
        // 2027_DBMS Preparatory Course_Level 1 (Only MCQ)
        case "PAT_DBMS_INTRODUCTION TO DBMS_MCQ":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a1599aa1f5b8ad919986e33/mcq";
        case "PAT_DBMS_ER MODELLING_MCQ":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a159b9c1f5b8ad919986e3e/mcq";
        case "PAT_DBMS_NORMALAIZATION_MCQ":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a159ca31f5b8ad919986e49/mcq";
        case "PAT_DBMS_DDL_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15a3da977f8342a2091759/mcq";
        case "PAT_DBMS_DDL_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15a40d977f8342a2091764/coding";
        case "PAT_DBMS_DDL_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15d4fa779ff3355db9dcb9/coding";
        case "PAT_DBMS_DML_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15d671779ff3355db9dcbc/mcq";
        case "PAT_DBMS_DML_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15d756779ff3355db9dcc7/coding";
        case "PAT_DBMS_DML_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15d908779ff3355db9dccb/coding";
        case "PAT_DBMS_Opeartors_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a15da4e779ff3355db9dcce/mcq";
        case "PAT_DBMS_OPERATORS_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a17d30ae6a86e99628e9f46/coding";
        case "PAT_DBMS_OPERATORS_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a17d510e6a86e99628e9f4a/coding";
        case "PAT_DBMS_AF_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a17d672e6a86e99628e9f4d/mcq";
        case "PAT_DBMS_AGGREGATE FUNCTIONS_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a17db308556eeb77e9091de/coding";
        case "PAT_DBMS_AGGREGATE FUNCTIONS_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a17dcfd8556eeb77e9091e2/coding";
        case "PAT_DBMS_SF_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a1810b98556eeb77e9091e5/mcq";
        case "PAT_DBMS_STRING FUNCTIONS_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a1813a18556eeb77e9091f0/coding";
        case "PAT_DBMS_STRING FUNCTIONS_COD_L1_FA":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a1816468556eeb77e9091f4/coding";
        case "PAT_DBMS_JOINS_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a1816868556eeb77e9091f7/mcq";
        case "PAT_DBMS_JOINS_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a181add8556eeb77e909202/coding";
        case "PAT_DBMS_JOINS_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a181bd18556eeb77e909206/coding";
        case "PAT_DBMS_SUBQUERY_MCQ_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a181cf38556eeb77e909209/mcq";
        case "PAT_DBMS_SUBQUERY_COD_PA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a181e8d8556eeb77e909214/coding";
        case "PAT_DBMS_SUBQUERY_COD_FA_L1":
            return origin + "6a15995d1f5b8ad919986e32/"
                + "assessments/6a18201b8556eeb77e909218/coding";
        // 2027_DBMS Preparatory Course_Level 1 (Only MCQ)
        //
        // Neopat_2027_VIT_AP_Daily Aptitude Assessment
        case "Day 1 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102f43e46340b040cdbb98/mcq";
        case "Day 2 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102f7fe46340b040cdbb99/mcq";
        case "Day 3 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102f88e46340b040cdbb9a/mcq";
        case "Day 4 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102f91e46340b040cdbb9b/mcq";
        case "Day 5 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102fa5e46340b040cdbb9c/mcq";
        case "Day 6 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102fb9e46340b040cdbb9d/mcq";
        case "Day 7 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102fc4e46340b040cdbb9e/mcq";
        case "Day 8 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102fcfe46340b040cdbb9f/mcq";
        case "Day 9 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102fe1e46340b040cdbba0/mcq";
        case "Day 10 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102ff0e46340b040cdbba1/mcq";
        case "Day 11 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a102ff9e46340b040cdbba2/mcq";
        case "Day 12 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a1484d496785bb5f295952d/mcq";
        case "Day 13 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a158f9c9be1529b8af3be8a/mcq";
        case "Day 14 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a17d00ae6a86e99628e9f27/mcq";
        case "Day 15 Aptitude Assessment":
            return origin + "6a0f1fab66d049fa93b310e8/"
                + "assessments/6a1c8139f55009f39f84ffcd/mcq";
        // Neopat_2027_VIT_AP_Daily Aptitude Assessment
        //
        // 2027_Aptitude Preparatory Course
        case "Prep course_Number System_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153295342105c4aa6bcefe/mcq";
        case "Prep course_Number System_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153302342105c4aa6bcf1d/mcq";
        case "Prep course_Number System_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153370342105c4aa6bcf3c/mcq";
        case "Prep course_Percentages_SI and CI_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153ce4342105c4aa6bcf5b/mcq";
        case "Prep course_Percentages_SI and CI_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153d14342105c4aa6bcf7a/mcq";
        case "Prep course_Percentages_SI and CI_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153d54342105c4aa6bcf99/mcq";
        case "Prep course_Time and Work_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153def342105c4aa6bcfb8/mcq";
        case "Prep course_Time and Work_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153e29342105c4aa6bcfd7/mcq";
        case "Prep course_Time and Work_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153e65342105c4aa6bcff6/mcq";
        case "Prep course_Time Speed and Distance_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153f6d342105c4aa6bd015/mcq";
        case "Prep course_Time Speed and Distance_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153f94342105c4aa6bd034/mcq";
        case "Prep course_Time Speed and Distance_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a153fd0342105c4aa6bd053/mcq";
        case "Prep course_Profit and Loss_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154014342105c4aa6bd072/mcq";
        case "Prep course_Profit and Loss_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154479342105c4aa6bd091/mcq";
        case "Prep course_Profit and Loss_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1544d0342105c4aa6bd0b0/mcq";
        case "Prep course_Probability_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a15456c342105c4aa6bd0cf/mcq";
        case "Prep course_Probability_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1545a5342105c4aa6bd0ee/mcq";
        case "Prep course_Probability_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1545cd342105c4aa6bd10d/mcq";
        case "Prep course_Permutation and Combination_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1546a9342105c4aa6bd12c/mcq";
        case "Prep course_Permutation and Combination_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1546d0342105c4aa6bd14b/mcq";
        case "Prep course_Permutation and Combination_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1546f0342105c4aa6bd16a/mcq";
        case "Prep course_Ratios and Proportion and Partnership_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a15471d342105c4aa6bd189/mcq";
        case "Prep course_Ratios and Proportion and Partnership_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154747342105c4aa6bd1a8/mcq";
        case "Prep course_Ratios and Proportion and Partnership_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154766342105c4aa6bd1c7/mcq";
        case "Prep course_Averages and Ages_Level 1 Course":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1547cb342105c4aa6bd1e6/mcq";
        case "Prep course_Averages and Ages_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1547fc342105c4aa6bd205/mcq";
        case "Prep course_Averages and Ages_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154966342105c4aa6bd224/mcq";
        case "Prep course_Reading comprehension_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154b0e342105c4aa6bd243/mcq";
        case "Prep course_Reading comprehension_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154b3f342105c4aa6bd262/mcq";
        case "Prep course_Reading comprehension_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154b6d342105c4aa6bd281/mcq";
        case "Prep course_Sentence correction_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154b91342105c4aa6bd2a0/mcq";
        case "Prep course_Sentence correction_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154bb9342105c4aa6bd2bf/mcq";
        case "Prep course_Sentence correction_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154bda342105c4aa6bd2de/mcq";
        case "Prep course_Sentence completion_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154c03342105c4aa6bd2fd/mcq";
        case "Prep course_Sentence completion_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154c24342105c4aa6bd31c/mcq";
        case "Prep course_Sentence completion_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154c4b342105c4aa6bd33b/mcq";
        case "Prep course_Para jumbles_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154c6e342105c4aa6bd35a/mcq";
        case "Prep course_Para jumbles_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154c8e342105c4aa6bd379/mcq";
        case "Prep course_Para jumbles_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154cc4342105c4aa6bd398/mcq";
        case "Prep course_Articles and prepositions_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154e20342105c4aa6bd3b7/mcq";
        case "Prep course_Articles and prepositions_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154e4d342105c4aa6bd3d6/mcq";
        case "Prep course_Articles and prepositions_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154e72342105c4aa6bd3f5/mcq";
        case "Prep course_Vocabulary_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154f34342105c4aa6bd414/mcq";
        case "Prep course_Vocabulary_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154f53342105c4aa6bd433/mcq";
        case "Prep course_Vocabulary_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154f71342105c4aa6bd452/mcq";
        case "Prep course_Voices and speech_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154f97342105c4aa6bd471/mcq";
        case "Prep course_Voices and speech_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154fc3342105c4aa6bd490/mcq";
        case "Prep course_Voices and speech_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a154ff4342105c4aa6bd4af/mcq";
        case "Prep course_Coding and decoding_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a155078342105c4aa6bd4ce/mcq";
        case "Prep course_Coding and decoding_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a155099342105c4aa6bd4ed/mcq";
        case "Prep course_Coding and decoding_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1550bc342105c4aa6bd50c/mcq";
        case "Prep course_Direction_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1550e6342105c4aa6bd52b/mcq";
        case "Prep course_Direction_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a155110342105c4aa6bd54a/mcq";
        case "Prep course_Direction_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a155130342105c4aa6bd569/mcq";
        case "Prep course_Seating Arrangement_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1588319be1529b8af3bb80/mcq";
        case "Prep course_Seating Arrangement_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1588649be1529b8af3bb9f/mcq";
        case "Prep course_Seating Arrangement_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1588879be1529b8af3bbbe/mcq";
        case "Prep course_Blood relation_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1588ed9be1529b8af3bbdd/mcq";
        case "Prep course_Blood relation_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1589179be1529b8af3bbfc/mcq";
        case "Prep course_Blood relation_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a15893f9be1529b8af3bc1b/mcq";
        case "Prep course_Series_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a15897f9be1529b8af3bc3a/mcq";
        case "Prep course_Series_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1589a39be1529b8af3bc59/mcq";
        case "Prep course_Series_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1589be9be1529b8af3bc78/mcq";
        case "Prep course_Data sufficiency_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a1589e99be1529b8af3bc97/mcq";
        case "Prep course_Data sufficiency_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158a2a9be1529b8af3bcb6/mcq";
        case "Prep course_Data sufficiency_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158a589be1529b8af3bcd5/mcq";
        case "Prep course_Data Interpretation_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158a7b9be1529b8af3bcf4/mcq";
        case "Prep course_Data Interpretation_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158a9a9be1529b8af3bd13/mcq";
        case "Prep course_Data Interpretation_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158abc9be1529b8af3bd32/mcq";
        case "Prep course_Syllogism_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158bed9be1529b8af3bd52/mcq";
        case "Prep course_Syllogism_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158c0e9be1529b8af3bd71/mcq";
        case "Prep course_Syllogism_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158c2c9be1529b8af3bd90/mcq";
        case "Prep course_Pipes and cisterns_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158c739be1529b8af3bdaf/mcq";
        case "Prep course_Pipes and cisterns_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158c969be1529b8af3bdc4/mcq";
        case "Prep course_Pipes and cisterns_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158ccc9be1529b8af3bdd9/mcq";
        case "Prep course_Boats and streams_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158cf29be1529b8af3bdee/mcq";
        case "Prep course_Boats and streams_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158d0e9be1529b8af3be03/mcq";
        case "Prep course_Boats and streams_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158d2f9be1529b8af3be18/mcq";
        case "Prep course_Mixtures and Alligations_Level 1":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158d539be1529b8af3be2d/mcq";
        case "Prep course_Mixtures and Alligations_Level 2":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158d7a9be1529b8af3be4c/mcq";
        case "Prep course_Mixtures and Alligations_Level 3":
            return origin + "6a153257342105c4aa6bcefd/"
                + "assessments/6a158d9f9be1529b8af3be6b/mcq";
        // 2027_Aptitude Preparatory Course
        //
        default:
            return '';
    }
}