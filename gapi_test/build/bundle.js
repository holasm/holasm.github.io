/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(5);


var gutil = {}

gutil.createDirWithExt = function createDirWithExt(parentId, dirName, extension, cb) {
  gutil.createDirIfNotExists(dirName+extension, parentId, cb)
}

gutil.createFileIfNotExists = function createFileIfNotExists(name, parentId, cb) {
  var qp = '';
  if (parentId !== '/') {// if not a parent provided create at rootDir
    qp = "'" + parentId + "' in parents and ";
  }

  // get all files in parentId
  window.gapi.client.drive.files.list({
    'q': qp + "name='" + name  + "' and trashed != true",
    'pageSize': 5,
    'fields': "nextPageToken, files(id, name)"
  }).execute(function(response) {
    if (response.message === 'Invalid Value') {
      console.log('Error...', response);
      cb('Error: Invalid Value found', response)
      return
    }

    if (!response.files) {
      console.error('No files found');
      cb('Error: no files found', response)
      return
    }

    /*Create a initial root folder*/
    if (response.files.length === 0) {
      var fileMetadata = {
        'name' : name,
        'mimeType' : 'text/plain'
      };

      if (parentId !== '/') {
        fileMetadata.parents = [ parentId ]
      }

      window.gapi.client.drive.files.create({
         resource: fileMetadata,
         fields: 'id, name'
      }).execute(function(resp, raw_resp) {
        cb(null, resp);
      });
      return
    }

    if (response.files.length === 1) {
      // ok
      cb(null, response.files[0]);
    } else {
      console.log('Already exists');
    }
  });
  // create if not exists
  // pass to cb
}

gutil.createDirIfNotExists = function createDirIfNotExists(name, parentId, cb) {
  var qp = '';
  if (parentId !== '/') {// if not a parent provided create at rootDir
    qp = "'" + parentId + "' in parents and ";
  }

  // get all files in parentId
  window.gapi.client.drive.files.list({
    'q': qp + "name='" + name  + "' and trashed != true",
    'pageSize': 5,
    'fields': "nextPageToken, files(id, name)"
  }).execute(function(response) {
    if (response.message === 'Invalid Value') {
      console.log('Error...', response);
      cb('Error: Invalid Value found', response)
      return
    }

    if (!response.files) {
      console.error('No files found');
      cb('Error: no files found', response)
      return
    }

    /*Create a initial root folder*/
    if (response.files.length === 0) {
      var fileMetadata = {
        'name' : name,
        'mimeType' : 'application/vnd.google-apps.folder'
      };

      if (parentId !== '/') {
        fileMetadata.parents = [ parentId ]
      }

      window.gapi.client.drive.files.create({
         resource: fileMetadata,
         fields: 'id, name'
      }).execute(function(res, raw_res) {
        cb(null, res);
      });
      return
    }
    
    if (response.files.length === 1) {
      // ok
      cb(null, response.files[0]);
    } else {
      console.log('Already exists');
    }
  });
  // create if not exists
  // pass to cb
}

/** 
 * read a file
 */
gutil.fetchBlob = function fetchBlob(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.setRequestHeader("Authorization", 'Bearer ' + window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
    xhr.onload = function () {
      console.log("Got response");
      console.log(this.response);
      callback(this.response);
    };
    xhr.onerror = function () {
      console.log('Failed to fetch ' + url);
    };
    xhr.send();
}

gutil.download = function download(id, cb) {
    gutil.fetchBlob('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media', function (data) {
        var reader = new FileReader();
        reader.addEventListener("loadend", function(event) {
           // event.reader.result contains the contents of blob as a typed array
           cb(event.target.result)
        });
        reader.readAsArrayBuffer(data);
    });
}

gutil.downloadAndDecode = function downloadAndDecode(id, cb) {
  gutil.download(id, function (arrBuff) {
    var data = String.fromCharCode.apply(null, new Uint8Array(arrBuff));
    cb(null, data, data.length)
    // appendd to markdown editor
  })
}


/** 
 * delete a file
 */
gutil.deleteFile = function deleteFile(id, cb) {
  window.gapi.client.drive.files.delete({
    fileId: id
  }).execute(function(res) {
    cb(null, res)
  });
}

/** 
 * upload a file
 */
gutil.uploadFile= function uploadFile(fileId, parentId, content, cb) {
  var boundary = '-------314159265358979323846';
  var delimiter = "\r\n--" + boundary + "\r\n";
  var close_delim = "\r\n--" + boundary + "--";
  var contentType = 'text/plain';
  var path = '/upload/drive/v3/files';
  var metadata = {
    mimeType: contentType
  };
  if (parentId !== '/') {
    metadata.parents = [ parentId ];
    // 0B5nfwpxzN1PHcm1uRnlDMk5GS0k
    // 0B5nfwpxzN1PHNmo3NVQ2aEdfdU0
  }

  var method = 'POST';
  if (fileId !== -1) {
    path += '/' + fileId;
    method = 'PATCH';
  }
  var headers = {
    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
  };
  var base64Data = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].encodeBase64(content);
  var multipartRequestBody = [
    delimiter,
    'Content-Type: application/json\r\n\r\n',
    JSON.stringify(metadata),
    delimiter,
    'Content-Type: ',
    contentType,
    '\r\n',
    'Content-Transfer-Encoding: base64\r\n',
    '\r\n',
    base64Data,
    close_delim
  ].join("");
  var request = window.gapi.client.request({
    'path': path,
    'method': method,
    'params': {
      'uploadType': 'multipart'
    },
    'headers': headers,
    'body': multipartRequestBody
  });
  var fn = function (res) {
    cb(null, res)
  }
  request.execute(function (res) {
    fn(res);
  })
}

// 0B5nfwpxzN1PHTDNlM0ROal8wM0E

// var NoteBookApi = {
//   notebook: NoteBook,
//   note: Note
// }

/* harmony default export */ __webpack_exports__["a"] = (gutil);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EXISTS; });
const EXISTS = 1



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gutil__ = __webpack_require__(0);


function handleGauthLoad (cb) {

  // var API_KEY = 'AIzaSyCnqibBifAO42IHtgSudez0c4GSHji4N2Q';
  
  // Client ID and API key from the Developer Console
  var CLIENT_ID = '55687462140-lbbgd3qj5famftfafi9f5b2bdn03nu6p.apps.googleusercontent.com';

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPE = 'https://www.googleapis.com/auth/drive';

  // var authorizeButton = document.getElementById('authorize-button');
  // var signoutButton = document.getElementById('signout-button');

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  
  window.gapi.load('client:auth2', initClient);

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    window.gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPE
    }).then(function () {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
      window.signIn = ()=>{handleAuthClick();}
      window.signOut = ()=>{handleSignoutClick();}
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn, cb1, cb2) {
    if (isSignedIn) {
      onGauth();
      if (cb1) { cb1() }
    } else {
      if (cb2) { cb2() }
    }
  }

  function onGauth() {
    // create a root folder if not exists
    __WEBPACK_IMPORTED_MODULE_0__gutil__["a" /* default */].createDirIfNotExists('LifeNotes', '/', function (err, res) {
      // startApp(rootId);
      if (err) {
        cb(err, res)
        return
      }
      cb(null, res)
    })
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  // function appendPre(message) {
  //   var pre = document.getElementById('content');
  //   var textContent = document.createTextNode(message + '\n');
  //   pre.appendChild(textContent);
  // }

}

/* harmony default export */ __webpack_exports__["a"] = (handleGauthLoad);

/**
 * Print files.
 */
// function listFiles() {
//   window.gapi.client.drive.files.list({
//     'pageSize': 100,
//     'fields': "nextPageToken, files(id, name)"
//   }).then(function(response) {
//     appendPre('Files:');
//     var files = response.result.files;
//     if (files && files.length > 0) {
//       for (var i = 0; i < files.length; i++) {
//         var file = files[i];
//         appendPre(file.name + ' (' + file.id + ')');
//       }
//     } else {
//       appendPre('No files found.');
//     }
//   });
// }

// 2
// function startApp(res) {
//   console.log(res);
//   window.nb = new NoteBook(res.id);
//   // createANote(rootDirId, 'hellomoto1', function (res) {
//   //   console.log(res)
//   // })
//   // getAllChapters(rootId, function (res) {
//   //   console.log(res)
//   // })
// }


// function getAllNotes(rootDir, cb) {
//    
// }

// Found the root directory
// function getAllDirWithExt(rootDirId, extension, cb) {
//   window.gapi.client.drive.files.list({
//     'q': " '"+ rootDirId + "' in parents and fullText contains '" + extension + "'",
//     'pageSize': 10,
//     'fields': "nextPageToken, files(id, name)"
//   }).execute(function(response) {
//     cb(response);
//   })
// }


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gutil__ = __webpack_require__(0);



//var newNote =  new Note('0B5nfwpxzN1PHazZ4MTFCX0U1OVk')
function Note (id) {
  this.noteId = id;

  this.metadata = {}
  this.noteMetaId = ''
  // create a note.json if not already exists
}

var noteProto = Note.prototype;

noteProto.init = function (cb) {
  var self = this
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
  // keep all task in sync otherwise theere will be inconsistencies bw local and remote
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createFileIfNotExists('note.json', self.noteId, function (err, res) {
    __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].downloadAndDecode(res.id, function (err, noteMeta, len) {
      self.noteMetaId = res.id;
      if (len === 0) {
        self.metadata = {};
        if (!self.metadata.chapters) {
          self.metadata.chapters = []
        }
      } else {
        self.metadata = JSON.parse(noteMeta);
        if (!self.metadata.chapters) {
          self.metadata.chapters = []
        }
      }
      if (err) {
        cb(err, self.metadata)
        return
      }

      cb(null, self.metadata)
      // show all structure
      // start the noteApp
    })
  })
}

noteProto.getChapters = function (cb) {
  // get from metadata
  cb(this.metadata.chapters)
}

noteProto.getTopics = function (chapterId, cb) {
  // update metadata
  // upload the note.json
  for(var i = 0, length1 = this.metadata.chapters.length; i < length1; i++){
    var chapter = this.metadata.chapters[i];
    if (chapter.id === chapterId) {
      cb(chapter.topics)
      return
    }
  }
}

noteProto.createChapter = function (name, cb) {
  // update metadata
  // upload the note.json
  var self = this;
  for(var i = 0, length1 = this.metadata.chapters.length; i < length1; i++){
    var chapter = this.metadata.chapters[i];
    if (chapter.name === (name + '.chapter')) {
      console.log('chapter already exists');
      cb(chapter, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* EXISTS */])
      return
    }
  }

  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createDirWithExt(this.noteId, name, '.chapter', function (err, res1) {
    if (err) {cb(err); return}
    
    // create introduction file
    __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createFileIfNotExists('intro.md', res1.id, function (err, res2) {
      // save the metadata
      self.metadata.chapters.push({
        name: res1.name,
        id: res1.id,
        introId: res2.id,
        topics: []
      })
      // save the note metadata
      self.updateNoteMetadata(cb);
    });

  });
}

noteProto.createTopic = function (chapterId, name, cb) {
  var chapterIndex = -1;
  var self = this;
  for(var i = 0, length1 = this.metadata.chapters.length; i < length1; i++){
    var chapter = this.metadata.chapters[i];
    if (chapter.id === chapterId) { // found chapter
      chapterIndex = i;
      for(var j = 0, length2 = chapter.topics.length; j < length2; j++){
        var topic = chapter.topics[j];
        if (topic.name === name) { // found topic
          console.log('topic already exists');
          cb(chapter, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* EXISTS */])
          return
        }
      }

      break
    }
  }

  if (chapterIndex === -1) {return}

  // create the chapter
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createFileIfNotExists(name+'.md', chapterId, function (err, res) {
    // save the metadata
    var chapter = self.metadata.chapters[chapterIndex]
    chapter.topics.push({
      name: res.name,
      id: res.id,
    })

    // save the metadata
    self.updateNoteMetadata(cb);
  });
}

noteProto.getTopicData = function (topicId, cb) {
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].downloadAndDecode(topicId, cb);
}

noteProto.updateTopic = function (id, data, cb) {
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].uploadFile(id, '/', data, cb);
}

noteProto.deleteChapter = function (id, cb) {
  var flag = 0;
  // find chapter
  for(var k = 0, length3 = this.metadata.chapters.length; k < length3; k++){
    var chapter = this.metadata.chapters[k];
    if (chapter.id  === id) {
      //matched id 
      this.metadata.chapters.splice(k, 1);
      flag = 1
      break
    }
  }
  if (flag) {
    this.updateNoteMetadata((res)=>{
      // delete the topic-name.md file
      __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

noteProto.deleteTopic = function (id, cb) {
  var flag = 0;
  // find chapter
  for(var k = 0, length3 = this.metadata.chapters.length; k < length3; k++){
    var chapter = this.metadata.chapters[k];
    for(var j = 0, length2 = chapter.topics.length; j < length2; j++){
      var topic = chapter.topics[j];
      if (topic.id  === id) {
        chapter.topics.splice(j, 1);
        //matched id 
        console.log(j)
        flag = 1
        break
      }
    }
    if (flag) {break}
  }
  if (flag) {
    this.updateNoteMetadata((res)=>{
      // delete the topic-name.md file
      __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

noteProto.updateNoteMetadata = function (cb) {
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].uploadFile(this.noteMetaId, '/', JSON.stringify(this.metadata), cb);
}

/* harmony default export */ __webpack_exports__["a"] = (Note);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gutil__ = __webpack_require__(0);



/**
 * NoteBook Class
 * 
 * @input: notebookId
 *
 */
function NoteBook(id) {
  this.noteBookId = id;

  this.metadata = {}
  // create a note.json if not already exists
}

NoteBook.prototype.init = function(cb) {
  var _self = this;
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createFileIfNotExists('notebook.json', this.noteBookId, function (err, res) {
    _self.noteBookMetaId = res.id;
    __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].downloadAndDecode(res.id, function (err, noteMeta, len) {
      _self.noteMetaId = res.id;
      if (len === 0) {
        _self.metadata = {};
        if (!_self.metadata.notes) {
          _self.metadata.notes = []
        }
      } else {
        _self.metadata = JSON.parse(noteMeta);
        if (!_self.metadata.notes) {
          _self.metadata.notes = []
        }
      }
      cb(null, _self.metadata)
      // show all structure
      // start the noteApp
    })
  })
}

NoteBook.prototype.getNotes = function(cb) {
  cb(this.metadata.notes)
};

NoteBook.prototype.createNote = function (name, cb) {
  // update metadata
  // upload the note.json
  var self = this
  for(var i = 0, length1 = this.metadata.notes.length; i < length1; i++){
    var note = this.metadata.notes[i];
    if (note.name === name) {
      console.log('Note already exists');
      cb(note, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* EXISTS */])
      return
    }
  }

  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createDirWithExt(this.noteBookId, name, '.note', function (err, res1) {
    if (err) {cb(err); return}
    console.log(res1)
    // if successfful create note.json
    __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].createFileIfNotExists('note.json', res1.id, function (err, res2) {
      self.metadata.notes.push({
        name: res1.name,
        id: res1.id,
        metaId: res2.id,
      })
      // save the note metadata
      self.updateNoteBookMetadata(cb)
    });
  });
}

NoteBook.prototype.deleteNote = function (id, cb) {
  var flag = 0;
  // find chapter
  for(var k = 0, length3 = this.metadata.notes.length; k < length3; k++){
    var note = this.metadata.notes[k];
    if (note.id  === id) {
      this.metadata.notes.splice(k, 1);
      //matched id 
      flag = 1
      break
    }
  }
  if (flag) {
    this.updateNoteBookMetadata((res)=>{
      // delete the topic-name.md file
      __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

NoteBook.prototype.updateNoteBookMetadata = function (cb) {
  __WEBPACK_IMPORTED_MODULE_1__gutil__["a" /* default */].uploadFile(this.noteBookMetaId, '/', JSON.stringify(this.metadata), cb);
}

/* harmony default export */ __webpack_exports__["a"] = (NoteBook);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var utils = {}
utils.encodeBase64 = function(str) {
  if(str.length === 0) {
    return "";
  }

  // UTF-8 to byte array
  var bytes = [], offset = 0, length, char;

  str = encodeURI(str);
  length = str.length;

  while(offset < length) {
    char = str[offset];
    offset += 1;

    if('%' !== char) {
      bytes.push(char.charCodeAt(0));
    }
    else {
      char = str[offset] + str[offset + 1];
      bytes.push(parseInt(char, 16));
      offset += 2;
    }
  }

  // byte array to base64
  var padchar = '=';
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var i, b10;
  var x = [];

  var imax = bytes.length - bytes.length % 3;

  for(i = 0; i < imax; i += 3) {
    b10 = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    x.push(alpha.charAt(b10 >> 18));
    x.push(alpha.charAt((b10 >> 12) & 0x3F));
    x.push(alpha.charAt((b10 >> 6) & 0x3f));
    x.push(alpha.charAt(b10 & 0x3f));
  }
  switch(bytes.length - imax) {
    case 1:
      b10 = bytes[i] << 16;
      x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + padchar + padchar);
      break;
    case 2:
      b10 = (bytes[i] << 16) | (bytes[i + 1] << 8);
      x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) + alpha.charAt((b10 >> 6) & 0x3f) + padchar);
      break;
    default:
      break;
  }
  return x.join('');
};

/* harmony default export */ __webpack_exports__["a"] = (utils);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gapi_gapi__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gapi_note__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gapi_notebook__ = __webpack_require__(4);




window.NB = {}

window.NN = __WEBPACK_IMPORTED_MODULE_1__gapi_note__["a" /* default */]

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__gapi_gapi__["a" /* default */])((err, res)=>{
  console.log('Authorized')
  console.log(err, res)
  NB = new __WEBPACK_IMPORTED_MODULE_2__gapi_notebook__["a" /* default */](res.id)
  NB.init((err, res)=>{
    console.log(res)
  })
})

/***/ })
/******/ ]);