'use strict';


/**
 * Add a new album to the store
 * Add a new album to the store
 *
 * body Album Create a new album in the store
 * returns Album
 **/
exports.addAlbum = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "some url with cover art of The Wall",
  "summary" : "summary",
  "duration" : 0,
  "band_name" : {
    "country" : "Bulgaria",
    "name" : "Slayer"
  },
  "colour" : "colour",
  "quantity" : 0,
  "price" : 0.5962133916683182,
  "name" : "The Wall",
  "format" : "format",
  "release_year" : 1900,
  "label_name" : {
    "name" : "gothic metal"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new album to the store
 * Add a new album to the store
 *
 * body Album Create a new album in the store
 * returns Album
 **/
exports.addAlbum = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "some url with cover art of The Wall",
  "summary" : "summary",
  "duration" : 0,
  "band_name" : {
    "country" : "Bulgaria",
    "name" : "Slayer"
  },
  "colour" : "colour",
  "quantity" : 0,
  "price" : 0.5962133916683182,
  "name" : "The Wall",
  "format" : "format",
  "release_year" : 1900,
  "label_name" : {
    "name" : "gothic metal"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a album
 * delete a album
 *
 * albumId Long Album id to delete
 * returns Album
 **/
exports.deleteAlbum = function(albumId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "some url with cover art of The Wall",
  "summary" : "summary",
  "duration" : 0,
  "band_name" : {
    "country" : "Bulgaria",
    "name" : "Slayer"
  },
  "colour" : "colour",
  "quantity" : 0,
  "price" : 0.5962133916683182,
  "name" : "The Wall",
  "format" : "format",
  "release_year" : 1900,
  "label_name" : {
    "name" : "gothic metal"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find album by ID
 * Returns a single album
 *
 * albumId Long ID of album to return
 * returns Album
 **/
exports.getAlbumById = function(albumId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "some url with cover art of The Wall",
  "summary" : "summary",
  "duration" : 0,
  "band_name" : {
    "country" : "Bulgaria",
    "name" : "Slayer"
  },
  "colour" : "colour",
  "quantity" : 0,
  "price" : 0.5962133916683182,
  "name" : "The Wall",
  "format" : "format",
  "release_year" : 1900,
  "label_name" : {
    "name" : "gothic metal"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns album inventory
 * Returns album inventory
 *
 * returns Map
 **/
exports.getAlbums = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "key" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a album in the store with form data
 *
 * albumId Long ID of album that needs to be updated
 * returns Album
 **/
exports.updateAlbumWithForm = function(albumId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cover" : "some url with cover art of The Wall",
  "summary" : "summary",
  "duration" : 0,
  "band_name" : {
    "country" : "Bulgaria",
    "name" : "Slayer"
  },
  "colour" : "colour",
  "quantity" : 0,
  "price" : 0.5962133916683182,
  "name" : "The Wall",
  "format" : "format",
  "release_year" : 1900,
  "label_name" : {
    "name" : "gothic metal"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

