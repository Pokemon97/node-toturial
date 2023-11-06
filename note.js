const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your note ...';
}

const addNote = (title, content) => {
    let notes = loadNotes();
    let duplicateNote = notes.find((note) => {
        return note.title === title;
    });

    if (duplicateNote) {
        console.log(chalk.red.inverse('Note is already existed!'));
    } else {
        notes.push({
            title: title,
            content: content
        });
        saveNotes(notes);

        console.log(chalk.green.inverse('New note was added!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const keepNotes = notes.filter((note) => {
        return note.title !== title
    });

    if (notes.length === keepNotes.length) {
        console.log(chalk.red.inverse('Note title "' + title + '" was not found!'));
    } else {
        saveNotes(keepNotes);
        console.log(chalk.green.inverse('Note title "' + title + '" was removed!'));
    }
}

const loadNotes = () => {
    try {
        const data = fs.readFileSync('notes.json');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const listNotes= () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const getNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => {
        return note.title === title;
    });

    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.content);
    } else {
        console.log(chalk.red.inverse('Note title "' + title + '" was not found!'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    getNote: getNote
}