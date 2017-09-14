$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            console.log(localStorage.notes);
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            var noteDate = octopus.formatDate(Date.now());
            console.log(noteStr);
            console.log(noteDate);
            model.add({
                content: noteStr,
                date: noteDate
            });
            view.render();
        },

        formatDate: function(dateTime) {
            var theDate = new Date(dateTime).toLocaleString();
            return theDate;
        },

        getNotes: function() {
            //.reverse() returns all notes in the inverted order, from newest to oldest
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + ' <br> ' + 
                        note.date + 
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});