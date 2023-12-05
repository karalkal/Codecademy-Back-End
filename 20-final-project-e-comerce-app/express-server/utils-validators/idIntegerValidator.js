function idIntegerValidator(id) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return false
    }
    return true
}

function verifyNonNullableFields(entity, data) {
    let essentialData
    // albums - construct essential data object from incoming data
    if (entity === "album") {
        essentialData = {
            name: data.name,
            cover: data.cover,
            release_year: data.release_year,
            band_name: data.band_name,
            label_name: data.label_name
        }
    }
    if (entity === "band") {
        essentialData = { name: data.name }
    }

    //generic validation
    for (let key in essentialData) {
        if (typeof essentialData[key] === "undefined") {
            return key
        }
    }
    return false
}


module.exports = { idIntegerValidator, verifyNonNullableFields }