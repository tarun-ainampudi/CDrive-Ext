function checkMatchBasedOnIncludes(question, solvedQuestion) {
    console.log(`[Debug] solvedQuestion: ${solvedQuestion}`);
    if (
        solvedQuestion.includes(question) ||
        question.includes(solvedQuestion)
    ) {
        console.log(`[Debug] Similar question match`);
        return true;
    }
    if (solvedQuestion.includes('and')) {
        const sQParts = solvedQuestion.split(/\band\b/);
        console.log(`[Debug] sQParts: ${sQParts}`);
        const filterQParts = sQParts.filter((part) => {
            return question.includes(part);
        });
        console.log(`[Debug] filterQParts: ${filterQParts}`);
        if (sQParts.length === filterQParts.length) {
            return true;
        }
    }
    return false;
}

const solvedKey = [
    { question: 'jobs, employees, and departments', answer: '' },
    { question: 'employees and departments', answer: '' },
    { question: 'salesman', answer: '' },
];

const questions = [
    'write a sql statement to prepare a list with salesman name, customer name, and their cities for the salesman and customer who belongs to the same city using join.arrange the output in ascending order of salesman table details(table names are case sensitive) table1: name: salesman column names: salesman_id, name, city, commission sample rows: +------------- +--------------+ --------------- +----------------------------- + | salesman_id | name | city | commission | +------------- +--------------+ --------------- +------------------------------+ | 5001 | william dev | florida | 1.12 | | 5002 | bob robert | boston | 0.91 | +------------------+ ----------------- +--------------+ ----------------------- + table2: name: customer_details column names: customer_id, cust_name, city, grade, salesman_id sample rows: +------------- +----------------+ ------------+ ------- +------------------------------- + | customer_id | cust_name | city | grade | salesman_id | +------------- +----------------+ ------------+ ------- +------------------------------- + | 3002 | bok lee | new york | 100 | 5001 | | 3007 | brian c | florida | 200 | 5001 | +------------- +----------------------- +------------- +----------- +------------------- + the output header should be as follows: salesman_name, customer_name, city note: there can be the same salesperson for different customers.use an inner join the retrieve the above details.the required input tables will be populated in the backend.',

    'from the table details given below, write a query to get the first name, last name, job title, and department name of employees who work in department id 9, 10. sort the output by ascending order of first name and last name.table names: jobs, employees, and departments the employees table stores the data of employees.the jobs table stores job data, including job title and salary ranges.the departments table stores department data.the required input tables are populated in the backend.',

    "from the er diagram of the hr database given below, write a query to display the department_id, department_name and number of employees(count) in each of the department.sort the output by ascending order of department_id.note: refer to the tables for employees and departments for column names in the below diagram.table names are case -sensitive.the output header should be in the same format as given in the 'output format' section.the required input tables are populated in the back end",
];

for (const question of questions) {
    console.log(`[Debug] Question: ${question}`);
    solvedKey.forEach((item) => {
        const bool = checkMatchBasedOnIncludes(question, item.question);
        console.log(`[Debug] Bool: ${bool}`);
    })
}