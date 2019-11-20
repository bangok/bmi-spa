let address = "http://188.131.191.14:85";
//let address = "http://localhost:85";

export default {
    register:address+"/user/register",
    login:address+"/user/login",
    getUserInfoById:address+"/user/getUserInfoById",
    getRecordbYTimeSlot:address+"/record/getRecordbYTimeSlot",
    updateWeightById:address+"/record/updateWeightById",
    addRecord:address+"/record/addRecord",
    updateHeightById:address+"/user/updateHeight"
}
