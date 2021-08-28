const baseUrl = 'https://ahkam-app.herokuapp.com';


async function addNote(noteData){
    const response = await fetch(`${baseUrl}/posts`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}


//update note
async function updateNote(noteData){
    const response = await fetch(`${baseUrl}/posts`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteData)
    });
    return response;
}


//delete note
async function deleteNote(noteId){
    const response = await fetch(`${baseUrl}/posts/${noteId}`,{
        method: "DELETE",
    });
    return response;
}


//get by Id note
async function getNoteById(noteId){
    const response = await fetch(`${baseUrl}/posts/${noteId}`);
    return response.json();
}



//get all notes
async function getNotes(noteTitle){
    let url = `${baseUrl}/posts`;
    if(noteTitle){
        url += `/?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();
}
