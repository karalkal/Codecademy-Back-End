function createInsertQuery(tableName, albumToAdd) {
    let text
    let values
    if (tableName === "album") {
        text = 'INSERT INTO ' + tableName + ' (name, cover, release_year, band_name, label_name, summary, duration, format, price, colour, quantity)'
            + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
        values = [
            albumToAdd.name, albumToAdd.cover, albumToAdd.release_year, albumToAdd.band_name, albumToAdd.label_name,
            albumToAdd.summary, albumToAdd.duration, albumToAdd.format, albumToAdd.price || 0, albumToAdd.colour || "black", albumToAdd.quantity
        ]
    }
    return { text, values }   // as object
}

function createDeleteQuery(tableName, albumId) {
    let text
    let values
    if (tableName === "album") {
        text = 'DELETE FROM ' + tableName + ' WHERE id=$1'
        values = [albumId]
    }
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
    return { text, values }   // as object
}

module.exports = { createInsertQuery, createDeleteQuery, createUpdateQuery }