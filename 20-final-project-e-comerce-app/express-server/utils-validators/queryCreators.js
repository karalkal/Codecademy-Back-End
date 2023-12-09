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

function createDeleteQuery(tableName, albumId) {
    let text = 'DELETE FROM ' + tableName + ' WHERE id=$1'
    let values = [albumId]

    return { text, values }   // as object
}

function createUpdateQuery(tableName, albumId, albumData) {
    let text
    let values
    if (tableName === "album") {
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' cover = $2,' + ' release_year = $3,'
            + ' band_name = $4,' + ' label_name = $5,' + 'summary = $6,' + ' duration = $7,'
            + ' format = $8,' + ' price = $9,' + '  colour = $10,' + ' quantity = $11'
            + ' WHERE id = ' + albumId + ' RETURNING * '

        values = [albumData.name, albumData.cover, albumData.release_year, albumData.band_name, albumData.label_name,
        albumData.summary, albumData.duration, albumData.format, albumData.price || 0, albumData.colour || "black", albumData.quantity]
    }
    if (tableName === "band") {
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1,' + ' country = $2' + ' WHERE id = ' + albumId + ' RETURNING * '
        values = [albumData.name, albumData.country]
    }
    if (tableName === "label" || tableName === "genre") {   // LABEL or GENRE
        text = 'UPDATE ' + tableName + ' SET ' + ' name = $1' + ' WHERE id = ' + albumId + ' RETURNING * '
        values = [albumData.name]

    }

    return { text, values }   // as object
}

module.exports = { createInsertQuery, createDeleteQuery, createUpdateQuery }