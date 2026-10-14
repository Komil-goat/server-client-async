// Data types for the transcript manager
export type StudentID = number
export type Student = { studentID: number, studentName: string }
export type Course = string
export type CourseGrade = { course: Course, grade: number }
export type Transcript = { student: Student, grades: CourseGrade[] }

// In-memory database of transcripts
let allTranscripts: Transcript[] = []

export function initialize() {
    addStudent("Sardor");
    addStudent("Jasur")
    addStudent("Jasur")
    addStudent("Nigora")

    console.log(`Initial list of transcripts:`)
    console.log(getAll())
}

export function getAll() {
    return allTranscripts
}

// Singleton class to manage student IDs
class StudentIDManager {
    private static lastUsedID = 0;

    public static newID(): number {
        this.lastUsedID++;
        return this.lastUsedID
    }
}


export function addStudent(name: string): StudentID {
    const newID = StudentIDManager.newID()
    const newStudent = {studentID: newID, studentName: name}
    allTranscripts.push({student: newStudent, grades: []})
    return newID
}

export function getTranscript(studentID: number): Transcript | undefined {
    return allTranscripts.find(transcript => (transcript.student.studentID == studentID))
}

export function getStudentIDs(studentName: string): StudentID[] {
    if (!studentName) {
        // Returns all student IDs
        return Array.from(new Set(allTranscripts.map(t => t.student.studentID)))
    }
    return allTranscripts.filter(transcript => (transcript.student.studentName == studentName))
        .map(transcript => transcript.student.studentID)
}

export function deleteStudent(studentID: StudentID): void {
    const index = allTranscripts.findIndex(t => (t.student.studentID == studentID))
    if (index == -1) {
        throw new Error(`no student with ID = ${studentID}`)
    }
    allTranscripts.splice(index, 1)
}

export function addGrade(studentID: StudentID, course: Course, grade: number): void {
    const tIndex = allTranscripts.findIndex(t => (t.student.studentID == studentID))
    if (tIndex == -1) {
        throw new Error(`no student with ID = ${studentID}`)
    }
    const theTranscript = allTranscripts[tIndex]
    try {
        allTranscripts[tIndex] = addGradeToTranscript(theTranscript, course, grade)
    } catch (e) {
        throw new Error(`student ${studentID} already has a grade in course ${course}`)
    }
}

function addGradeToTranscript(theTranscript: Transcript, course: Course, grade: number): Transcript {
    const grades = theTranscript.grades
    if (grades.findIndex(entry => entry.course === course) != -1) {
        throw new Error()
    }
    return {student: theTranscript.student, grades: grades.concat({course: course, grade: grade})}
}

export function getGrade(studentID: StudentID, course: Course): number {
    const theTranscript = allTranscripts.find(t => t.student.studentID == studentID)
    const theGrade = theTranscript?.grades.find(g => g.course == course)
    if (theGrade === undefined) {
        throw new Error(`no grade for student ${studentID} in course ${course}`)
    }
    return theGrade.grade
}