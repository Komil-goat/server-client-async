import express from 'express';
import {Request, Response} from 'express'
import  cors from 'cors'
import * as db from './transcriptManager'

const app: express.Application = express();
const PORT = 4001

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.initialize()
app.listen(PORT, () => console.log(`Express server now listening on localhost:${PORT}`))


app.get('/transcripts', (req: Request, res: Response) => {
    console.log('Handling GET/transcripts')
    let data = db.getAll()
    console.log(data)
    res.status(200).send(data)
})

app.post('/transcripts', (req: Request, res: Response) => {
    const studentName: string = req.body.name;
    let studentID = db.addStudent(studentName)
    console.log(`Handling POST/transcripts name=${studentName}, id=${studentID}`)
    res.status(201).send({studentID: studentID})
})

app.get('/transcripts/:id', (req: Request, res: Response) => {
    const id = req.params.id
    console.log(`Handling GET /transcripts/:id id = ${id}`)
    const theTranscript = db.getTranscript(parseInt(String(id)));
    if (theTranscript === undefined) {
        res.status(404).send(`No student with id = ${id}`)
    } else {
        res.status(200).send(theTranscript)
    }
})

app.get('/studentids', (req: Request, res: Response) => {
    const studentName = req.query.name as string
    console.log(`Handling GET /studentids studentName=${studentName}`)
    const ids = db.getStudentIDs(studentName)
    console.log(`ids = ${ids}`)
    res.status(200).send(ids)
})

app.delete('/transcripts/:id', (req: Request, res: Response) => {
    const id = parseInt(String(req.params.id))
    console.log(`Handling DEL /transcripts, id = ${id}`)
    try {
        db.deleteStudent(id);
        res.sendStatus(204)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.post('/transcripts/:studentID/:course', (req: Request, res: Response) => {
    try {
        const studentID = parseInt(String(req.params.studentID))
        const course = req.params.course as string
        const grade = parseInt(req.body.grade as string)
        console.log
        (`Handling POST studentid = ${studentID}; course = ${course}, grade = ${grade}`)
        db.addGrade(studentID, course, grade)
        res.sendStatus(201)
    } catch (e) {
        console.trace(e);
        res.status(400).send(e)
    }
})

app.get('/transcripts/:studentID/:course', (req: Request, res: Response) => {
    try {
        const studentID = parseInt(String(req.params.studentID))
        const course = String(req.params.course)
        console.log(`Handling GET studentID=${studentID} course = ${course}`)
        const grade = db.getGrade(studentID, course)
        res.status(200).send({
            studentID: studentID,
            course: course,
            grade: grade
        })
    } catch (e) {
        res.status(400).send(e)
    }
})