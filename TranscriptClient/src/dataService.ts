import * as rs from './remoteService.js'

// functions for all available API calls to the remote server

export async function getTranscripts() {
    return await rs.remoteGet('transcripts')
}

export async function getStudentIDs() {
    return await rs.remoteGet('studentids')
}

export async function postTranscript(data: any) {
    return await rs.remotePost('transcripts', data)
}

export async function getTranscriptByID(studentID: string) {
    return await rs.remoteGet(`transcripts/${studentID}`)
}

export async function deleteTranscript(studentID: string) {
    return await rs.remoteDelete(`transcripts/${studentID}`)
}

export async function getCourse(studentID: string, course: string) {
    return await rs.remoteGet(`transcripts/${studentID}/${course}`)
}

export async function postCourse(studentID: string, course: string, data: any) {
    return await rs.remotePost(`transcripts/${studentID}/${course}`, data)
}