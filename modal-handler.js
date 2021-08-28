const { response } = require("express");


function openAddModal() {
    var model = document.getElementById('addNoteModal');
    var closeSpan = document.getElementById('closeAdd');
    var cancelButton = document.getElementById('cancelAddNoteBtn');

    clearFields();

    model.style.display = "block";

    closeSpan.onclick = () => {
        model.style.display = "none";
    }

    cancelButton.onclick = () => {
        model.style.display = "none";
    }
}


//clear
function clearFields() {
    document.getElementById('addTitle').value = "";
    document.getElementById('addContent').value = "";
    document.getElementById('addSurce').value = "";
    document.getElementById('addCategory').value = "";
    document.getElementById('addDepartment').value = "";
    document.getElementById('addDesc').value = "";
    document.getElementById('addQuz').value = "";
    document.getElementById('addWhriter').value = "";
    document.getElementById('addError').innerHTML = "";

}

function saveNewNote() {
    const titleString = document.getElementById('addTitle').value;
    const contentString = document.getElementById('addContent').value;
    const surceString = document.getElementById('addSurce').value;
    const categoryString = document.getElementById('addCategory').value;
    const departmentString = document.getElementById('addDepartment').value;
    const descString = document.getElementById('addDesc').value;
    const qwzString = document.getElementById('addQuz').value;
    const whriterString = document.getElementById('addWhriter').value;

    const noteData = { 
        title: titleString,
        ar_text:contentString,
        en_title:"en-title",
        quz:qwzString,
        en_quz:"en-qwz",
        en_text:"en-text",
        source:surceString,
        creatorName:whriterString,
        category:categoryString,
        department:departmentString,
        createdDate:new Date(),
        updatedDate:new Date(),
        description:descString,
        deviceNo:'n00',
        views:0,
        };
    if (titleString && contentString && qwzString &&surceString &&categoryString&&departmentString&&descString &&whriterString) {
        addNote(noteData).then(response => {
            if (response.ok) {
                var model = document.getElementById('addNoteModal');
                model.style.display = "none";
                response.json().then(json => {
                    var newNoteId = json['_id'];
                    updateNotesTable(newNoteId);
                });
            } else {
                response.text().then(error => {
                    document.getElementById('addError').innerHTML = `error field ${error}`;
                });
            }
        }).catch(error => {
            console.log(error);
            response.text().then(error => {
                document.getElementById('addError').innerHTML = error;

            });

        });
    } else {

        console.log('no value');
    }
}

function openEditModel(noteId) {
    var model = document.getElementById('editNoteModal');
    var closeSpan = document.getElementById('closeEdit');
    var cancelButton = document.getElementById('cancelEditNoteBtn');

    model.style.display = "block";

    closeSpan.onclick = () => {
        model.style.display = "none";
    }

    cancelButton.onclick = () => {
        model.style.display = "none";
    }

    loadNoteData(noteId);

}

//load edit data
function loadNoteData(noteId) {
    //انشاء اتربيوت يحمل قيمة الاي دي
    var model = document.getElementById('editNoteModal');
    var noteIdAttribute = document.createAttribute('noteid');
    noteIdAttribute.value = noteId;
    model.setAttributeNode(noteIdAttribute);

    getNoteById(noteId).then(data => {
        document.getElementById('editTitle').value = data['title'];
        document.getElementById('editContent').value = data['ar_text'];
        document.getElementById('editSurce').value= data['source'];
        document.getElementById('editCategory').value= data['category'];
        document.getElementById('editDepartment').value= data['department'];
        document.getElementById('editDesc').value= data['description'];
        document.getElementById('editQuz').value= data['quz'];
        document.getElementById('editWhriter').value= data['creatorName'];


    });
}

//save edit data
function saveEditNote() {
    var model = document.getElementById('editNoteModal');
    const noteId = model.getAttribute('noteid');
    const titleStr = document.getElementById('editTitle').value;
    const contentStr = document.getElementById('editContent').value;
    const surceString = document.getElementById('editSurce').value;
    const categoryString = document.getElementById('editCategory').value;
    const departmentString = document.getElementById('editDepartment').value;
    const descString = document.getElementById('editDesc').value;
    const qwzString = document.getElementById('editQuz').value;
    const whriterString = document.getElementById('editWhriter').value;

    const noteData = { _id: noteId, title: titleStr, ar_text: contentStr,
        quz:qwzString,
        source:surceString,
        creatorName:whriterString,
        category:categoryString,
        department:departmentString,
        updatedDate:new Date(),
        description:descString,
    
    };
  
    if(noteId && titleStr && contentStr){
        updateNote(noteData).then(response => {
            if (response.ok) {
                var model = document.getElementById('editNoteModal');
                model.style.display = "none";
                updateNotesTable(noteId);
    
            } else {
                response.text().then(error => {
                    document.getElementById('editError').innerHTML = error;
                });
    
            }
        }).catch(error =>{
            document.getElementById('editError').innerHTML = error;
    
        });
    }else{
        console.log('some value empty');
    }
}