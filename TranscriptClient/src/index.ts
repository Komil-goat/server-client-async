import * as ds from "./dataService.js"

// get all data
function btnGetTranscriptClick() {
    ds.getTranscripts().then((transcript) => {
        alert("Transcripts received!")

        const container = document.getElementById("transcriptsContainer")
        if (container) {
            container.innerHTML = JSON.stringify(transcript, null, 4)
        }
    }).catch((e) => {
        alert("Failed to get transcripts")
    })
}
// get all IDs
function btnGetStudentIDsClick() {
    ds.getStudentIDs().then((studentIDs) => {
        alert("Student IDs received!")

        const container = document.getElementById("studentIDsContainer")
        if (container) {
            container.innerHTML = JSON.stringify(studentIDs, null, 4)
        }
    }).catch((e) => {
        alert("Failed to get student IDs")
    })
}
// post transcript
function btnPostTranscriptClick() {
    const input = document.getElementById("transcriptInput")
    if (input && input instanceof HTMLInputElement) {
        const name = input.value
        const data = {
            name: name,
            transcript: "Transcript"
        }
        ds.postTranscript(data).then(() => {
            alert("Transcript posted successfully!")
        }).catch((e) => {
            alert("Failed to post transcript")
        })
    }
}
// get transcript by ID
function btnGetTranscriptByIDClick() {
    const input = document.getElementById("idInput")
    if (input && input instanceof HTMLInputElement) {
        const studentID = input.value
        ds.getTranscriptByID(studentID).then((transcript) => {
            alert("Transcript received!")
            const container = document.getElementById("transcriptsContainer")
            if (container) {
                container.innerHTML = JSON.stringify(transcript, null, 4)
            }
        }).catch((e) => {
            alert("Failed to get transcript by ID")
        })
    }
}
// delete transcript
function btnDeleteTranscriptClick(){
    const input = document.getElementById("idInput")
    if (input && input instanceof HTMLInputElement) {
        const studentID = input.value
        ds.deleteTranscript(studentID).then((transcript) => {
            alert("Transcript deleted!")
        }).catch((e) => {
            alert("Failed to delete transcript")
        })
    }
}
// get course
function btnGetCourseClick() {
    const studentIDInput = document.getElementById("studentID")
    const courseInput = document.getElementById("course")
    if (studentIDInput && studentIDInput instanceof HTMLInputElement &&
        courseInput && courseInput instanceof HTMLInputElement) {
        const studentID = studentIDInput.value
        const course = courseInput.value
        ds.getCourse(studentID, course).then((courseData) => {
            alert("Course data received!")
            const container = document.getElementById("courseContainer")
            if (container) {
                container.innerHTML = JSON.stringify(courseData, null, 4)
            }
        }).catch((e) => {
            alert("Failed to get course data")
        })
    }
}
// post course
function btnPostCourseClick() {
    const studentIDInput = document.getElementById("studentID")
    const courseInput = document.getElementById("course")
    const gradeInput = document.getElementById("grade")
    if (studentIDInput && studentIDInput instanceof HTMLInputElement &&
        courseInput && courseInput instanceof HTMLInputElement &&
        gradeInput && gradeInput instanceof HTMLInputElement) {
        const studentID = studentIDInput.value
        const course = courseInput.value
        const grade = parseInt(gradeInput.value)
        ds.postCourse(studentID, course, { grade: grade }).then((courseData) => {
            alert("Course data posted!")
        }).catch((e) => {
            alert("Failed to post course data")
        })
    }
}


/* listeners for all buttons */

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnGetTranscripts");
    if (btn) {
        btn.addEventListener("click", btnGetTranscriptClick);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnPost = document.getElementById("btnGetStudentIDs");
    if (btnPost) {
        btnPost.addEventListener("click", btnGetStudentIDsClick);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnPost = document.getElementById("btnPostTranscript");
    if(btnPost) {
        btnPost.addEventListener("click", btnPostTranscriptClick);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnGetByID = document.getElementById("btnGetTranscriptByID");
    if(btnGetByID) {
        btnGetByID.addEventListener("click", btnGetTranscriptByIDClick);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnGetByID = document.getElementById("btnDeleteTranscript");
    if(btnGetByID) {
        btnGetByID.addEventListener("click", btnDeleteTranscriptClick);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnGetByID = document.getElementById("btnGetCourse");
    if(btnGetByID) {
        btnGetByID.addEventListener("click", btnGetCourseClick);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const btnPostCourse = document.getElementById("btnPostCourse");
    if (btnPostCourse) {
        btnPostCourse.addEventListener("click", btnPostCourseClick);
    } else {
        alert("Button #btnPostCourse not found!");
    }
});

// async function script1() {
//     const ts = await ds.getTranscripts()
//     console.log("Transcripts:")
//     console.log(ts)
//     console.log()

//     const sids = await ds.getStudentIDs()
//     console.log("Student IDS:")
//     console.log(sids)
//     console.log()
// }

// script1().then(() => {
//     console.log("Script1 is done")
// }).catch(e => {
//     console.error("Script1 failed:")
//     console.error(e)
// })