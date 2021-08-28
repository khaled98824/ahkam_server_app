function updateNotesTable(noteId,noteTitle){
    var table =document.getElementById('notes-table');

    var rowCount =table.rows.length;
    //delete rows for new search
    while(--rowCount) {
        table.deleteRow(rowCount);
    }
    getNotes(noteTitle).then(data =>{
        data.forEach(note => {
            var row = table.insertRow(1);
            var idAttribute = document.createAttribute("id");
            idAttribute.value = note['_id'];
            row.setAttributeNode(idAttribute);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = note["title"];
            cell2.innerHTML = note["ar_text"];
            cell3.innerHTML = note["updatedDate"];
            cell4.innerHTML = `<a onclick="openEditModel('${note['_id']}')" href="#"><img src="images/edit.png" style="width:22px;"></a>
                               <a onclick="confirmDeleteNote('${note['_id']}')" href="#"><img src="images/delete.png" style="width:22px;"></a>`


        });
    }).then(()=>{
        if(noteId){
          var row = document.getElementById(noteId);
          row.setAttribute("style", "animation: new-row 6s;");  
        }
    })
}

//search
function searchNotes(){
    const searchTitle = document.getElementById('searchInput').value;
    updateNotesTable(undefined,searchTitle);
}

//delete note
function confirmDeleteNote (noteId){
    var action = confirm("هل انت متاكد من حذف المنشور");
    if(action==true){
        deleteNote(noteId).then(()=>{
            updateNotesTable();
        })
    }
}
