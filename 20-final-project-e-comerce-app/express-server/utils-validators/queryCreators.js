function createInsertQuery(tableName, dataToInsert) {
    let text
    let values
    if (tableName === "album") {
        text = 'INSERT INTO ' + tableName + ' (name, cover, release_year, band_name, label_name, summary, duration, format, price, colour, quantity)'
            + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
        values = [
            dataToInsert.name, dataToInsert.cover, dataToInsert.release_year, dataToInsert.band_name, dataToInsert.label_name,
            dataToInsert.summary, dataToInsert.duration, dataToInsert.format, dataToInsert.price || 0, dataToInsert.colour || "black", dataToInsert.quantity
        ]
    }
    if (tableName === "band") {     // BAND
        text = 'INSERT INTO ' + tableName + ' (name, country)'
            + ' VALUES ($1, $2) RETURNING *'
        values = [dataToInsert.name, dataToInsert.country]
    }
    if (tableName === "label" || tableName === "genre") {   // LABEL or GENRE
        text = 'INSERT INTO ' + tableName + ' (name)'
            + ' VALUES ($1) RETURNING *'
        values = [dataToInsert.name]
    }
    if (tableName === "album_genre") {
        text = 'INSERT INTO ' + tableName + ' (album_id, genre_id)'
            + ' VALUES ($1, $2) RETURNING *'
        values = [dataToInsert.albumId, dataToInsert.genreId]
    }

    return { text, values }   // as object
}

function createDeleteQuery(tableName, firstArg, secondArd) {
    let text
    let values
    if (["album", "band", "genre", "label"].includes(tableName)) {
        text = 'DELETE FROM ' + tableName + ' WHERE id=$1'
        values = [firstArg]
    }
    if (tableName === "album_genre") {
        text = 'DELETE FROM ' + tableName + ' WHERE album_id=$1 AND genre_id=$2'
        values = [firstArg, secondArd]
    }

    return { text, values }   // as object
}

function createUpdateQuery(tableName, itemId, updatedData) {
    let text
    let values
    if (tableName === "album") {
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' cover = $2,' + ' release_year = $3,'
            + ' band_name = $4,' + ' label_name = $5,' + 'summary = $6,' + ' duration = $7,'
            + ' format = $8,' + ' price = $9,' + '  colour = $10,' + ' quantity = $11'
            + ' WHERE id = ' + itemId + ' RETURNING * '

        values = [updatedData.name, updatedData.cover, updatedData.release_year, updatedData.band_name, updatedData.label_name,
        updatedData.summary, updatedData.duration, updatedData.format, updatedData.price || 0, updatedData.colour || "black", updatedData.quantity]
    }
    if (tableName === "band") {
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' country = $2' + ' WHERE id = ' + itemId + ' RETURNING * '
        values = [updatedData.name, updatedData.country]
    }
    if (tableName === "label" || tableName === "genre") {   // LABEL or GENRE
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1' + ' WHERE id = ' + itemId + ' RETURNING * '
        values = [updatedData.name]
    }

    return { text, values }   // as object
}

module.exports = { createInsertQuery, createDeleteQuery, createUpdateQuery }