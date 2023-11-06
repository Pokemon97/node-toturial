const notes = require('./note');
const yargs = require('yargs');

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        content: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.green.bold('Title:'), argv.title);
        console.log(chalk.green.bold('Content:'), argv.content);
        notes.addNote(argv.title, argv.content)
    }
}).command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(chalk.green.bold('Title:'), argv.title);
        notes.removeNote(argv.title)
    }
}).command({
    command: 'list',
    describe: 'List all notes',
    handler: (argv) => {
        notes.listNotes()
    }
}).parse();