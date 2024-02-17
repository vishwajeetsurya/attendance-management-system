const asyncHandler = require("express-async-handler")
const Batch = require("../models/Batch")
const Student = require("../models/Student")
const Attendance = require("../models/Attendance")

exports.getBatch = asyncHandler(async (req, res) => {
    const result = await Batch.find()
    res.status(200).json({ message: "Batch fetch success", result })
})
exports.addBatch = asyncHandler(async (req, res) => {
    await Batch.create(req.body)
    res.status(201).json({ message: "Batch Add success" })
})
exports.updatebatch = asyncHandler(async (req, res) => {
    const { batchId } = req.params
    await Batch.findByIdAndUpdate(batchId, req.body, { runValidators: true })
    res.status(200).json({ message: "Batch Update success" })
})
exports.deleteBatch = asyncHandler(async (req, res) => {
    const { batchId } = req.params
    await Batch.findByIdAndDelete(batchId)
    res.status(200).json({ message: "Batch delete success" })
})

// student curud
exports.getStudent = asyncHandler(async (req, res) => {
    const result = await Student.find()
    res.status(200).json({ message: "Studnet fetch success", result })
})
exports.getStudentByBatch = asyncHandler(async (req, res) => {
    const { batchId } = req.params

    const result = await Student.find({ batchId })
    res.status(200).json({ message: "Studnet fetch success", result })
})
exports.addStudent = asyncHandler(async (req, res) => {
    await Student.create(req.body)
    res.status(201).json({ message: "Studnt Add success" })
})
exports.updateStudent = asyncHandler(async (req, res) => {
    const { studId } = req.params
    await Student.findByIdAndUpdate(studId, req.body, { runValidators: true })
    res.status(200).json({ message: "Studnet Update success" })
})
exports.deleteStudent = asyncHandler(async (req, res) => {
    const { studId } = req.params
    await Student.findByIdAndDelete(studId)
    res.status(200).json({ message: "Student delete success" })
})




exports.getAttendance = asyncHandler(async (req, res) => {
    const { studId } = req.params
    const result = await Attendance.find({ studId })
    res.status(200).json({ message: "Attendance fetch success", result })
})
exports.addAttendance = asyncHandler(async (req, res) => {
    const x = req.body.map(item => {
        return { studId: item.studId, date: item.date, isPresent: item.isPresent }
    })
    const result = await Attendance.findOne({ studId: x[0].studId, date: x[0].date })

    if (result) {
        return res.status(400).json({ message: "Duplicate Attendance" })
    }
    await Attendance.create(x)
    res.status(200).json({ message: "Attendance add success", })
})
exports.updateAttendance = asyncHandler(async (req, res) => {
    const { attendanceId } = req.params
    await Attendance.findByIdAndUpdate(attendanceId, req.body, { runValidators: true })
    res.status(200).json({ message: "Attendance update success", })
})

exports.deleteAttendance = asyncHandler(async (req, res) => {
    const { attendanceId } = req.params
    await Attendance.deleteMany()
    res.status(200).json({ message: "Attendance delete success" })
})