const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const passwordManager = require("./passwordManager");
/*
const databaseAccess = {
    database: 'railway',
    host: 'containers-us-west-60.railway.app',
    password: 'ItZGES5HKkPtd5VjCNpZ',
    port: 6535,
    user: 'postgres',
};//reemplazar por .env

*/

require('dotenv').config()
const databaseAccess = {
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user: process.env.USER,
};


const client = new Pool(databaseAccess);


const getUseruserType = async (key) => {
    //// Searches the user into the admin table
    const adminQuery = await client.query(`select * from admin where username=$1`, [key]);
    if (adminQuery.rowCount != 0) {
        return "admin";
    }
    //// Searches the user into the medic chain table
    const medicChainQuery = await client.query(`select * from medical_chain where name=$1`, [key]);
    if (medicChainQuery.rowCount != 0) {
        return "medical_chain";
    }
    //// Searches the user into the medic center table
    const medicCenterQuery = await client.query(`select * from medical_center where name=$1`, [key]);
    if (medicCenterQuery.rowCount != 0) {
        return "medical_center";
    }
    //// Searches the user into the coordinator/secretary table
    const coordinatorQuery = await client.query(`select * from coordinator where rut=$1`, [key]);
    if (coordinatorQuery.rowCount != 0) {
        return "coordinator";
    }
    //// Searches the user into the medic table
    const medicQuery = await client.query(`select * from doctor where rut=$1`, [key]);
    if (medicQuery.rowCount != 0) {
        return "doctor";
    }
    //// Searches the user into the patient table
    const patientQuery = await client.query(`select * from patient where rut=$1`, [key]);
    if (patientQuery.rowCount != 0) {
        return "patient";
    }

    return "Not Found";

};

const login = async (key, password) => {
    /////////////////////// INSTEAD OF 'USERNAME', 'ID', ETC... WE USE THE VARIABLE NAME 'KEY' AS A GENERALITY TO REFER ANY OF THE FOLLOWING PRIMARY KEYS: 
    const PrimaryKeyDicctionary = {
        /// user type : primary key
        "admin": "username",
        "medical_chain": "name",
        "medical_center": "name",
        "coordinator": "rut",
        "doctor": "rut",
        "patient": "rut"
    };
    const userType = await getUseruserType(key);
    if (userType == "Not Found") {
        return "Not Found";
    }
    else {
        const primaryKey = PrimaryKeyDicctionary[userType];
        queryValidarContraseña = await client.query(`select * from ${userType} where (${primaryKey}=$1 )`, [key]);
        /// validates that there is one row that matches primary key
        if (queryValidarContraseña.rowCount == 1) {
            const encriptedPassword = queryValidarContraseña['rows'][0].password;
            const result = await passwordManager.validatePassword(password, encriptedPassword);
            /// validates that the password(user input) matches with the encriptedPassword(stored in the database)
            console.log(queryValidarContraseña.rows);
            if (result == true) {
                console.log(queryValidarContraseña.rows);
                if (userType == "medical_chain" || userType == "medical_center") {
                    return ({
                        token : {
                            rol: userType,
                            key: key,
                            id: queryValidarContraseña['rows'][0].id
                        } 
                    });
                }
                return ({
                    token : {
                        rol: userType,
                        key: key
                    },
                    data_user : queryValidarContraseña.rows[0]
                });

            }
        }
        return "Incorrect Password";
    }

};


module.exports = {
    /// las funciones que se veran al exportar el modulo
    client,
    getUseruserType,
    login
}
