const { getBatch, addBatch, updatebatch, deleteBatch, getStudent, addStudent, updateStudent, deleteStudent, getAttendance, addAttendance, updateAttendance, deleteAttendance, getStudentByBatch } = require("../controller/adminController")

const router = require("express").Router()

router
    .get("/batch", getBatch)
    .post("/batch-add", addBatch)
    .put("/batch-update/:batchId", updatebatch)
    .delete("/batch-delete/:batchId", deleteBatch)


    .get("/student", getStudent)
    .get("/student-by-batch/:batchId", getStudentByBatch)
    .post("/student-add", addStudent)
    .put("/student-update/:studId", updateStudent)
    .delete("/student-delete/:studId", deleteStudent)


    .get("/attendance/:studId", getAttendance)
    .post("/attendance-add", addAttendance)
    .put("/attendance-update/:attendanceId", updateAttendance)
    .delete("/attendance-delete", deleteAttendance)

module.exports = router