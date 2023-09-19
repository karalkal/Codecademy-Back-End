process.stdout.write("Type anything: ");

process.stdin.on('data', (userInput) => {
    process.stdout.write(`Prev entry was: ${userInput}Keep typing... `)
});

