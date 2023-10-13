const fs = require("fs");

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    } else {
        return 1;
    }
};

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find((r) => r.id == id);
        if (!row) {
            reject({
                message: "ID is not good",
                status: 404,
            });
        }
        resolve(row);
    });
}

function findUser(array, email) {
    const row = array.find((user) => user.email == email);
    if (!row) return null;
    return row;
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    getNewId,
    mustBeInArray,
    writeJSONFile,
    findUser,
};