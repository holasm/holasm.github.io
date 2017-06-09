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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return assertUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return logStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return log; });
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

/* harmony default export */ __webpack_exports__["d"] = (utils);

const log = function () {
  if (window.env !== 'dev') {
    var arr = arguments
    console.log.apply(null, arr)
  }
}

const logStore = {
  store: [],
  push: function () {
    var ret = []
    for(var k = 0, length3 = arguments.length; k < length3; k++){
      ret.push(arguments[k])
    }
    this.store.push(ret.join(' + '))
  },
  flushInLine: function () {
    var msg = []
    if (this.store.length) {
      console.log(this.store.join(' =--= '))
    }
    this.store = []
  }
}

const assertUpdate = (metadata, task, cb1, cb2)=>{
  // search file in metadata and check for last updatedAt
  var passed = 'FAILED'
  if (metadata.updatedAt < task.payload.timestamp) {
    passed = 'PASSED '
  }
  logStore.push(['Asserting:timestamp:',passed, metadata.updatedAt , task.payload.timestamp, task.payload.timestamp - metadata.updatedAt])
  if (metadata.updatedAt < task.payload.timestamp) {
    cb1()
  } else {
    cb2()
  }
}






/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global,
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(key, val) {
		fn(key, val)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


var gutil = {}

gutil.createDirWithExt = function createDirWithExt(parentId, dirName, extension, cb) {
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
  gutil.createDirIfNotExists(dirName+extension, parentId, cb)
}

gutil.createFileIfNotExists = function createFileIfNotExists(name, parentId, cb) {
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
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
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
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
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
  window.gapi.client.drive.files.delete({
    fileId: id
  }).execute(function(res) {
    cb(null, res)
  });
}

/** 
 * upload a file
 */
gutil.uploadFile= function uploadFile(fileId, parentId, content, cb, data) {
  if (!window.gapi || !window.gapi.client) {
    cb('Error: gapi or gapi.client not defined!', null)
    return
  }
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
  var base64Data = __WEBPACK_IMPORTED_MODULE_0__utils__["d" /* default */].encodeBase64(content);
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
  var fn = function (res, data) {
    cb(null, res, data)
  }
  request.execute(function (res) {
    fn(res, data);
  })
}

// 0B5nfwpxzN1PHTDNlM0ROal8wM0E

// var NoteBookApi = {
//   notebook: NoteBook,
//   note: Note
// }

/* harmony default export */ __webpack_exports__["a"] = (gutil);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var engine = __webpack_require__(19)

var storages = __webpack_require__(20)
var plugins = [__webpack_require__(17)]

module.exports = engine.createStore(storages, plugins)


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EXISTS; });
const EXISTS = 1



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__init_chapters__ = __webpack_require__(11);




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

  // DEV ---------------------------
  if (window.env === 'dev') {
    var metadata = __WEBPACK_IMPORTED_MODULE_2__init_chapters__["a" /* default */]
    __WEBPACK_IMPORTED_MODULE_2__init_chapters__["a" /* default */].noteId = self.noteId
    self.metadata = metadata
    setTimeout(()=>{
      cb(null, self.metadata)
      // CNote.init((res)=>{
      //   cb(null, res)
      // })
    }, 1000)
    return 
  }
  // DEV END -----------------------

  // keep all task in sync otherwise theere will be inconsistencies bw local and remote
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists('note.json', self.noteId, function (err, res) {
    __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].downloadAndDecode(res.id, function (err, noteMeta, len) {
      self.noteMetaId = res.id;
      self.metadata = JSON.parse(noteMeta)
      if (len === 0) {
        self.metadata = {
          updatedAt: ((new Date()).getTime()) - 1000000,
          metaId: res.id,
          noteId: self.noteId,
          chapters: []
        }
      } else if (!self.metadata.chapters) {
        self.metadata.chapters = []
        self.metadata.metaId = res.id
      }

      if (!self.metadata.updatedAt) {
        cb('Error: Note updatedAt prop not found!')
      }
      console.log(noteMeta)
      console.log(self.metadata)

      //  else if (noteMeta.chapters.) {
      //   self.metadata.metaId = res.id;

      //   if (!self.metadata.chapters) {
      //     self.metadata.chapters = []
      //   }
      // }else{
      //   self.metadata = JSON.parse(noteMeta);
      //   if (!self.metadata.chapters) {
      //     self.metadata.chapters = []
      //   }
      // }

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

noteProto.createChapterSync = function (name, cb) {
  // DEV ---------------------------
  if (window.env === 'dev') {
    // CNote.createChapter(name, function (id) {
    //   cb(null, {id})
    // })
    setTimeout(()=>{
      cb(null, {id: Math.floor(Math.random()*1000)})
    }, 500)
    return
  }
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

  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createDirWithExt(this.noteId, name, '.chapter', function (err, res) {
    if (err) {cb(err); return}
    cb(null, res)
  });
}

noteProto.createChapterIntroSync = function (id, name, cb) {
  var self = this
  if (window.env === 'dev') {
    // DEV:COMM: create localStore intro.md if not already exists
    
    // self.metadata.chapters.forEach((chapter)=>{
    //   if (chapter.id === id) {
    //     if (chapter.introId === res.id) {
    //       setTimeout(()=>{
    //         cb(null, self.metadata)
    //       }, 1000)
    //       return
    //     }
    //   }
    // });

    var introId =  Math.floor(Math.random()*1000)
    self.metadata.chapters.push({
      name: name,
      id: id,
      introId,
      topics: []
    })
    setTimeout(()=>{
      cb(null, self.metadata, introId)
    }, 1000)
    return
  }
  // create introduction file
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists('intro.md', id, function (err, res) {
    // save the metadata

    // if intro.md created but not saved in metadata
    self.metadata.chapters.forEach((chapter)=>{
      if (chapter.id === id) {
        if (chapter.introId === res.id) {
          cb(null, self.metadata, res.id)
          return
        }
      }
    });

    self.metadata.chapters.push({
      name: name,
      id: id,
      introId: res.id,
      topics: []
    })
    console.log(self.metadata)
    cb(null, self.metadata, res.id) // saved afterwards
    // save the note metadata
    // self.updateNoteMetadata(cb, );
  });
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

  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createDirWithExt(this.noteId, name, '.chapter', function (err, res1) {
    if (err) {cb(err); return}
    
    // create introduction file
    __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists('intro.md', res1.id, function (err, res2) {
      // save the metadata
      self.metadata.chapters.push({
        name: res1.name,
        id: res1.id,
        introId: res2.id,
        topics: []
      })
      // save the note metadata
      var fn = function () {
        
      }
      self.updateNoteMetadata(cb, {chapter: res1, intro: res2});
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
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists(name+'.md', chapterId, function (err, res) {
    // save the metadata
    var chapter = self.metadata.chapters[chapterIndex]
    chapter.topics.push({
      name: res.name,
      id: res.id,
    })

    // save the metadata
    self.updateNoteMetadata(cb, {topic: res});
  });
}

noteProto.createTopicSync = function (chapterId, name, cb) {
  // DEV ---------------------------
    if (window.env === 'dev') {
      setTimeout(()=>{
        cb(null, null, Math.floor(Math.random()*1000))
      }, 1000)
      return
    }

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
            cb(null, self.metadata, topic.id)
            return
          }
        }

        break
      }
    }

    if (chapterIndex === -1) {return}

    // create the chapter
    __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists(name+'.md', chapterId, function (err, res) {
      // save the metadata
      var chapter = self.metadata.chapters[chapterIndex]
      chapter.topics.push({
      name: res.name,
      id: res.id,
    })

    cb(null, self.metadata, res.id)
    // save the metadata
    // self.updateNoteMetadata(cb, {topic: res});
  });
}

noteProto.getTopicData = function (topicId, cb) {
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].downloadAndDecode(topicId, cb);
}

noteProto.updateTopic = function (id, data, cb) {
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].uploadFile(id, '/', data, cb);
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
      __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

/**
 * 1. deleteChapterSync
 * 2. updateMetadata
 * 3. deleteFile
 */

noteProto.deleteChapterSync = function (id, cb) {
  var flag = 0;
  var self = this
  // find chapter
  for(var k = 0, length3 = this.metadata.chapters.length; k < length3; k++){
    var chapter = this.metadata.chapters[k];
    console.log(chapter.id, id, chapter.id === id)
    if (chapter.id == id) {
      //matched id 
      this.metadata.chapters.splice(k, 1);
      flag = 1
      break
    }
  }
  if (flag) {
    cb(null, self.metadata) // saved later
  } else {
    cb('Chapter with id => '+ id + ' not found', self.metadata)
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
      __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

/**
 * 1. deleteTopicSync
 * 2. updateMetadata
 * 3. deleteFile
 */

noteProto.deleteTopicSync= function (id, cb) {
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
    cb(null, self.metadata) // saved later
    // this.updateNoteMetadata((res)=>{
      // delete the topic-name.md file
      // gutil.deleteFile(id, cb);
    // })
  } else {
    cb('Topic with id:'+ id + ' not found', self.metadata)
  }
}

noteProto.updateNoteMetadata = function (cb, data) {
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].uploadFile(this.noteMetaId, '/', JSON.stringify(this.metadata), cb, data);
}

noteProto.updateNoteMetadataSync = function (data, cb) {
  if (window.env === 'dev') {
    setTimeout(()=>{
      // CNote.saveMetadata(data)
      cb(null, 'dev metadata updated.')
    }, 1000)
    return
  }
  self.metadata = data
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].uploadFile(this.noteMetaId, '/', JSON.stringify(data), cb);
}

/* harmony default export */ __webpack_exports__["a"] = (Note);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateTopicRemoteId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return updateChapterRemmoteId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



const updateFutureTask = function (self, cb) {
  self.tasks.forEach(function(task) {
    cb(task)
  });
  // update localStorage
  __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('tasks', self.tasks)
}

const updateChapterRemmoteId = function (self, localId, remoteId) {
  updateFutureTask(self, (task)=>{
    if (task.payload.chapterLocalId === localId) {
      task.payload.chapterRemoteId = remoteId
      __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* logStore */].push(task.type)
    }
  })
}

const updateTopicRemoteId = function (self, localId, remoteId) {
  updateFutureTask(self, (task)=>{
    if (task.payload.topicLocalId === localId) {
      task.payload.topicRemoteId = remoteId
      __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* logStore */].push(task.type)
    }
  });
}

const updateMetadata = function (self, noteId, metadata) {
  updateFutureTask(self, (task)=>{
    if (task.type === '@UPDATE_METADATA') {
      if (task.payload.noteId === noteId) {
        task.payload.metadata = metadata
        __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* logStore */].push('Update metadata => ',task.type)
      }
    }
  });
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__ = __webpack_require__(2);



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
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists('notebook.json', this.noteBookId, function (err, res) {
    _self.noteBookMetaId = res.id;
    __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].downloadAndDecode(res.id, function (err, noteMeta, len) {
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

  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createDirWithExt(this.noteBookId, name, '.note', function (err, res1) {
    if (err) {cb(err); return}
    console.log(res1)
    // if successfful create note.json
    __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].createFileIfNotExists('note.json', res1.id, function (err, res2) {
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
      __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].deleteFile(id, cb);
    })
  }
}

NoteBook.prototype.updateNoteBookMetadata = function (cb) {
  __WEBPACK_IMPORTED_MODULE_1__gcode_gutil__["a" /* default */].uploadFile(this.noteBookMetaId, '/', JSON.stringify(this.metadata), cb);
}

/* harmony default export */ __webpack_exports__["a"] = (NoteBook);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gutil__ = __webpack_require__(2);


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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return testIncompleteTaskLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return testCreateChapter; });
/* unused harmony export testUpdateChapterIntro */
/* unused harmony export testDeleteChapter */
/* unused harmony export testCreateTopic */
/* unused harmony export testDeleteTopic */
/* unused harmony export testUpdateTopic */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gapi__ = __webpack_require__(12);

window.syncSave = __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */]

const testIncompleteTaskLoading = ()=>{
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].loadTasks()
}

const testCreateNote = ()=>{
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'CREATE_NOTE',
    payload: {
      noteId: 1
    }
  })
}

const testCreateChapter = ()=>{
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'CREATE_CHAPTER',
    payload: {
      noteId: 1,
      name: 'chapter 1',
      chapterLocalId: '1',
    }
  })
}

const testDeleteChapter = ()=>{
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'DELETE_CHAPTER',
    payload: {
      noteId: 1,
      name: 'chapter 1',
      chapterLocalId: '1',
      chapterRemoteId: '1',
    }
  }) 
}

const testCreateTopic = ()=>{
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'CREATE_TOPIC',
    payload: {
      noteId: 3,
      name: 'topic 1',
      topicLocalId: '2',
      chapterLocalId: '1',
      chapterRemoteId: '-'
    }
  })
}

const testUpdateTopic = ()=>{  
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'UPDATE_TOPIC_DATA',
    payload: {
      noteId: 2,
      topicLocalId: '1',
      topicRemoteId: '1',
      htmlText: '<span>topic id update text</span>'
    }
  })
}

const testDeleteTopic = ()=>{  
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'DELETE_TOPIC',
    payload: {
      noteId: 2,
      chapterLocalId: '1',
      chapterRemoteId: '1.remote',
      topicLocalId: '2',
      topicRemoteId: '2.remote',
    }
  })
}

const testUpdateChapterIntro = ()=>{  
  __WEBPACK_IMPORTED_MODULE_0__gapi__["a" /* default */].addTask({
    type: 'UPDATE_CHAPTER_INTRO_FILE',
    payload: {
      noteId: 2,
      chapterRemoteId: '-',
      chapterLocalId: '2',
      introId: '2',
      htmlText: '<span>topic id update text</span>'
    }
  })
}

//   syncSave.addTask({
//     type: 'DISABLE_CHAPTER',
//     payload: {
//       noteId: 2,
//       chapterLocalId: '1',
//       chapterRemoteId: '-',
//     }
//   })

//   syncSave.addTask({
//     type: 'DISABLE_TOPIC',
//     payload: {
//       noteId: 2,
//       topicLocalId: '2',
//       topicRemoteId: '-',
//     }
//   })

//   syncSave.addTask({
//     type: 'UPDATE_METADATA',
//     payload: {
//       noteId: 8,
//       metadata: 'metadata :)'
//     }
//   })

//   syncSave.addTask({
//     type: 'DISABLE_TOPIC',
//     payload: {
//       noteId: 3,
//       topicLocalId: '2',
//       topicRemoteId: '-'
//     }
//   })
// }




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



const addTask = function (self, task){
  setTimeout(()=>{
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('updateRemaining', true)
    task.payload.timestamp = self.timeStamp()
    var _task = Object.assign({}, task)
      switch (task.type) {
        case 'CREATE_CHAPTER':
          // create extrea jobs
          addTask(self, {
            type: '@CREATE_CHAPTER_FILE',
            payload:{
              noteId: _task.payload.noteId,
              name: _task.payload.name,
              chapterLocalId: _task.payload.chapterLocalId,
            }
          })

          addTask(self, {
            type: '@CREATE_CHAPTER_INTRO_FILE',
            payload:{
              noteId: _task.payload.noteId,
              name: _task.payload.name,
              chapterLocalId: _task.payload.chapterLocalId,
            }
          })

          addTask(self, {
            type: 'UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            }
          })
          break;

        case 'CREATE_TOPIC':
          // create extrea jobs
          addTask(self, {
            type: '@CREATE_TOPIC_FILE',
            payload:{
              noteId: _task.payload.noteId,
              name: _task.payload.name,
              chapterLocalId: _task.payload.chapterLocalId,
              topicLocalId: _task.payload.topicLocalId,
            }
          })
          addTask(self, {
            type: 'UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            }
          })
          break;

        case 'DELETE_TOPIC':
          addTask(self, {
            type: '@DELETE_TOPIC_CREATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              chapterLocalId: _task.payload.chapterLocalId,
              chapterRemoteId: _task.payload.chapterRemoteId,
              topicLocalId: _task.payload.topicLocalId,
              topicRemoteId: _task.payload.topicRemoteId,
            }
          })

          addTask(self, {
            type: '@UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            }
          })

          addTask(self, {
            type: '@DELETE_TOPIC_FILE',
            payload:{
              noteId: _task.payload.noteId,
              chapterLocalId: _task.payload.chapterLocalId,
              chapterRemoteId: _task.payload.chapterRemoteId,
              topicLocalId: _task.payload.topicLocalId,
              topicRemoteId: _task.payload.topicRemoteId,
            }
          })
          break

        case 'DELETE_CHAPTER':
          addTask(self, {
            type: '@DELETE_CHAPTER_CREATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              chapterLocalId: _task.payload.chapterLocalId,
              chapterRemoteId: _task.payload.chapterRemoteId,
            }
          })
          addTask(self, {
            type: '@UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            }
          })

          addTask(self, {
            type: '@DELETE_CHAPTER_FILE',
            payload:{
              noteId: _task.payload.noteId,
              chapterLocalId: _task.payload.chapterLocalId,
              chapterRemoteId: _task.payload.chapterRemoteId,
            }
          })
          break

        case 'UPDATE_CHAPTER_INTRO_FILE':
          task.type = '@'+task.type
          addTask(self, task)
          addTask(self, {
            type: '@UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            } 
          })
          break

        case 'UPDATE_TOPIC_DATA':
          task.type = '@UPDATE_TOPIC_FILE'
          addTask(self, task)
          addTask(self, {
            type: '@UPDATE_METADATA',
            payload:{
              noteId: _task.payload.noteId,
              metadata: ''
            } 
          })
          break

        default:
          if (_task.type[0] !== '@') {
            _task.type = '@'+task.type
          }
          self.tasks.push(_task)
          // update localStorage
          __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('tasks', self.tasks)
          break;
    }

    if (!self.running) {
      self.run()
    }
  }, 50)

  // setTimeout(()=>{
  // }, 100)
}

/* harmony default export */ __webpack_exports__["a"] = (addTask);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  chapters: [
    {
      name: 'gapi chap 1',
      id: '1',
      topics: [
        {
          name: 'gapi topic 1',
          id: '2',
        }
      ]
    },
    {
      name: 'gapi chap 2',
      id: '2',
      topics: []
    },
    {
      name: 'gapi chap 3',
      id: '3',
      topics: []
    }
  ]
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sync_syncSave__ = __webpack_require__(15);

// import syncGet from './sync/syncSave'

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__sync_syncSave__["a" /* default */]);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_note__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__update_future_tasks__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__note_cases__ = __webpack_require__(14);





const execute =  function (self) {
  var noteId = ''
  var noteId = ''

  __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* logStore */].push([self.tasks.length])
  var task = self.tasks[0]
  // update localStorage
  if (task.message) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(task.message)
  }

  console.error('TASK => '+task.type, task.payload)

  switch (task.type) {
    case '@CREATE_NOTE':
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__note_cases__["a" /* caseCreateNote */])(self, task)
        // setTimeout(()=>{
        //   log('Create a note from id ', task.payload.noteId)
        //   self.note.noteId = task.payload.noteId
        //   self.next()
        // }, 200)
      break

    case '@CREATE_CHAPTER_FILE': // => @CREATE_CHAPTER_INTRO_FILE
      console.log(self.tasks)
      self.assertNote(task, ()=>{
        // console.log(self.note.metadata)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> New chapter created')
          self.note.createChapterSync(task.payload.name, (err, res)=>{
            
            __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* logStore */].flushInLine() // flush messages

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["a" /* updateChapterRemmoteId */])(self, task.payload.chapterLocalId, res.id)
            self.next()
          })
          // updateChapterRemmoteId(self, task.payload.chapterLocalId, id)
          // self.next()
        }, ()=>{
          self.next(1)
        })

        // setTimeout(()=>{
        //   // update all remoteChapteId
        //   var id = Math.random(); id *= 100; id = Math.floor(id);
        //   updateChapterRemmoteId(self, task.payload.chapterLocalId, id)
        //   self.next()
        // }, 200)
      })
      break 

    case '@CREATE_CHAPTER_INTRO_FILE': // => @UPDATE_METADATA
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          self.note.createChapterIntroSync(task.payload.chapterRemoteId, task.payload.name, (err, metadata)=>{
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Chapter intro file created.')
            // log(metadata)
            // get the introId and update others
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["b" /* updateMetadata */])(self, self.note.noteId, self.note.metadata)
            self.next()
          })
        }, ()=>{
          self.next(1)
        })
      })
      break

    case '@UPDATE_CHAPTER_INTRO_FILE':
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          self.note.updateTopic(task.payload.introId, 'Updated inro', (err, res)=>{
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Chapter intro data updated')
            // update file
            // assign metadata update
            // updateMetadata(self, task.payload.noteId, self.note.metadata)
            self.next()
          })
        }, ()=>{
          self.next(1)
        })

        // setTimeout(()=>{
        //   self.next()
        // }, 200)
      })
      break

    case '@DISABLE_CHAPTER':
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Chapter disabled')
        // updateMetadata(self, task.payload.noteId, self.note.metadata)
        setTimeout(()=>{
          self.next()
        }, 200)
      })
      break

    case '@DELETE_CHAPTER_CREATE_METADATA':
      self.assertNote(task, ()=>{
        console.log('++++++++++++==================')
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          console.log(task.payload)
          console.log('++++++++++++==================')
          self.note.deleteChapterSync(task.payload.chapterRemoteId, (err, metadata)=>{
            if (err) { __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(err); return }
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Chapter delete metadata created')
            console.log(metadata)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["b" /* updateMetadata */])(self, self.note.noteId, metadata)
            console.log('-----------------')
            self.next()
          })
        }, ()=>{
          console.log('==================')
          self.next(1)
        })
      })
      break

    case '@CREATE_TOPIC_FILE':  // => @UPDATE_METADATA
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> New topic created')
          self.note.createTopicSync(task.payload.topicRemoteId, task.payload.name, (err, metadata, id)=>{
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["c" /* updateTopicRemoteId */])(self, task.payload.topicLocalId, id)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["b" /* updateMetadata */])(self, task.payload.noteId, self.note.metadata) // for DEV metadata === null
            self.next()
          })
        }, ()=>{
          self.next(1)
        })

        // setTimeout(()=>{
        //   var id = Math.random(); id *= 100; id = Math.floor(id);
        //   updateTopicRemoteId(self, task.payload.topicLocalId, id)
        //   self.next()
        // }, 200)
      })
      break

    case '@UPDATE_TOPIC_FILE':
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Topic data updated')
          self.note.updateTopic(task.payload.topicRemoteId, task.payload.markdownText, (err, res)=>{
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["b" /* updateMetadata */])(self, task.payload.noteId, self.note.metadata)
            self.next()
          })
        }, ()=>{ // skip task
          self.next(1)
        })
        
        // log('Topic data updated')
        // setTimeout(()=>{
        //   self.next()
        // }, 200)
      })
      break // => @UPDATE_METADATA

    case '@DISABLE_TOPIC':
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Topic disabled')
        setTimeout(()=>{
          self.next()
        }, 1000)
      })
      break

    case '@DELETE_TOPIC_CREATE_METADATA':
      self.assertNote(task, ()=>{
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
          self.note.deleteTopicSync(task.payload.topicRemoteId, (err, metadata)=>{
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__update_future_tasks__["b" /* updateMetadata */])(self, self.note.noteId, metadata)
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* log */])(' -> Topic delete metadata created')
            self.next()
          })
        }, ()=>{
          self.next(1)
        })
      })
      break

    case '@DELETE_CHAPTER_FILE':
      self.next()
      // caseUpdateMetadata(self, task)
      break // using metaId

    case '@DELETE_TOPIC_FILE':
      self.next()
      // caseUpdateMetadata(self, task)
      break // using metaId

    case '@UPDATE_METADATA':
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__note_cases__["b" /* caseUpdateMetadata */])(self, task)
      break // using metaId

    default:
      console.info('=> No task given')
  }
}

/* harmony default export */ __webpack_exports__["a"] = (execute);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return caseCreateNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return caseUpdateMetadata; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_note__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__update_future_tasks__ = __webpack_require__(6);




const caseCreateNote = (self, task) => {
  if (self.note.noteId === task.payload.noteId) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* log */])(' -> Requested note already exists')
    self.next(1)
  } else {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* log */])(' -> Create a note from id ', task.payload.noteId)
    window.note = self.note = new __WEBPACK_IMPORTED_MODULE_0__element_note__["a" /* default */](task.payload.noteId)
    self.note.init((err, metadata)=>{
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* log */])(metadata)
      self.note.metadata = metadata
      self.note.metadata.updatedAt = self.timeStamp() - 10000
      self.next()
    })
  }
}

const caseUpdateMetadata = (self, task)=>{
  self.assertNote(task, ()=>{
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* assertUpdate */])(self.note.metadata, task, ()=>{
      var metadata = Object.assign({}, task.payload.metadata)
      metadata.updatedAt = task.payload.timestamp
      self.note.updateNoteMetadataSync(metadata, (err, res)=>{
        console.log(metadata)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* log */])(' -> Metadata updated.', res)
        self.next()
      })
      console.log('Just finishing tasks...')
      self.next()
    }, ()=>{
      console.log(' --> Skipping metadata update.')
      self.next(1)
    })
    // log('Metadata updated')
    // setTimeout(()=>{
    //   self.next()
    // }, 200)
  })
}



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__addTask_addTask__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__execute__ = __webpack_require__(13);





window.localStore=__WEBPACK_IMPORTED_MODULE_0_store___default.a

const async = {
  note: {
    // noteId: 1
  }, // Note Object will be assigned hete
  metadata: {},
  tasks: [], // load task from localStorage
  running: false,
  lastUpdateCall: 0,
  addTask: function (task) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__addTask_addTask__["a" /* default */])(this, task) // some new tasks are assigned
  },
  dumpTasks: function () {
    console.log([].concat(this.tasks))
    this.tasks = []
    this.running = false
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.remove('tasks')
  },
  loadTasks: function () {
    if(__WEBPACK_IMPORTED_MODULE_0_store___default.a.get('updateRemaining')){
      var tasks = __WEBPACK_IMPORTED_MODULE_0_store___default.a.get('tasks')
      var oldTasks = []
      for (var key in tasks) {
        tasks[key].message = '***OLD*** task loaded from local store'
        oldTasks.push(tasks[key])
      }
      this.tasks =  oldTasks

      // *** assign cleaning task

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* log */])(this.tasks)
      if (this.tasks.length) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* log */])('Running loaded', this.tasks.length , 'tasks')
        this.run() 
      }
    }
  },
  timeStamp: function (){
    this.lastUpdateCall = ((new Date()).getTime())
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('lastUpdateCall', this.lastUpdateCall)
    return this.lastUpdateCall
  },
  assertNote: function (task, cb1) {
    if (this.note.noteId === task.payload.noteId) {
      cb1()
    } else {
      // this.tasks.unshift(Object.assign({}, task))
      this.tasks.unshift({
        type: '@CREATE_NOTE',
        payload: {noteId: task.payload.noteId}
      })
      this.run()
    }
  },
  next: function (skip) {
    var task = this.tasks.shift()
    __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('tasks', Object.assign({}, this.tasks)) // update localstorage to update later
    // console.log(localStore.get('tasks'))
    // console.log(this.note.metadata.updatedAt)
    if (skip) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* log */])('SKIPPING => ',task.type)
    }
    __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* logStore */].flushInLine()
    this.run()
  },
  run: function () {
    if (this.tasks.length===0) { 
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* log */])('All tasks finished...waiting...')
      this.running = false
      __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('updateRemaining', false)
      __WEBPACK_IMPORTED_MODULE_0_store___default.a.set('tasks', [])
      return
    }
    this.running = true
    this.execute()
  },
  execute: function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__execute__["a" /* default */])(this)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (async);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tests_server_sync__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gapi_gcode_gauth__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gapi_element_notebook__ = __webpack_require__(7);
window.env = 'prod'





window.NB = {}

if (window.env !== 'dev') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__gapi_gcode_gauth__["a" /* default */])((err, res)=>{
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tests_server_sync__["a" /* testIncompleteTaskLoading */])()

    console.log('Authorized')
    console.log(err, res)
    NB = new __WEBPACK_IMPORTED_MODULE_2__gapi_element_notebook__["a" /* default */](res.id)
    NB.init((err, res)=>{
      console.log(res)
    })
  })
} else {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tests_server_sync__["a" /* testIncompleteTaskLoading */])()
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tests_server_sync__["b" /* testCreateChapter */])()
  // testUpdateChapterIntro()
  // testDeleteChapter()
  // testCreateTopic()
  // testUpdateTopic()
  // testDeleteTopic()
}









/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = json2Plugin

function json2Plugin() {
	__webpack_require__(18)
	return {}
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1)
var slice = util.slice
var pluck = util.pluck
var each = util.each
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore,
}

var storeAPI = {
	version: '2.0.4',
	enabled: false,
	storage: null,

	// addStorage adds another storage to this store. The store
	// will use the first storage it receives that is enabled, so
	// call addStorage in the order of preferred storage.
	addStorage: function(storage) {
		if (this.enabled) { return }
		if (this._testStorage(storage)) {
			this._storage.resolved = storage
			this.enabled = true
			this.storage = storage.name
		}
	},

	// addPlugin will add a plugin to this store.
	addPlugin: function(plugin) {
		var self = this

		// If the plugin is an array, then add all plugins in the array.
		// This allows for a plugin to depend on other plugins.
		if (isList(plugin)) {
			each(plugin, function(plugin) {
				self.addPlugin(plugin)
			})
			return
		}

		// Keep track of all plugins we've seen so far, so that we
		// don't add any of them twice.
		var seenPlugin = pluck(this._seenPlugins, function(seenPlugin) { return (plugin === seenPlugin) })
		if (seenPlugin) {
			return
		}
		this._seenPlugins.push(plugin)

		// Check that the plugin is properly formed
		if (!isFunction(plugin)) {
			throw new Error('Plugins must be function values that return objects')
		}

		var pluginProperties = plugin.call(this)
		if (!isObject(pluginProperties)) {
			throw new Error('Plugins must return an object of function properties')
		}

		// Add the plugin function properties to this store instance.
		each(pluginProperties, function(pluginFnProp, propName) {
			if (!isFunction(pluginFnProp)) {
				throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
			}
			self._assignPluginFnProp(pluginFnProp, propName)
		})
	},

	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this._storage().read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this._storage().write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this._storage().remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this._storage().each(function(val, namespacedKey) {
			callback(self._deserialize(val), namespacedKey.replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this._storage().clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// namespace clones the current store and assigns it the given namespace
	namespace: function(namespace) {
		if (!this._legalNamespace.test(namespace)) {
			throw new Error('store.js namespaces can only have alhpanumerics + underscores and dashes')
		}
		// create a prefix that is very unlikely to collide with un-namespaced keys
		var namespacePrefix = '__storejs_'+namespace+'_'
		return create(this, {
			_namespacePrefix: namespacePrefix,
			_namespaceRegexp: namespacePrefix ? new RegExp('^'+namespacePrefix) : null
		})
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function(storages, plugins) {
		return createStore(storages, plugins)
	},
}

function createStore(storages, plugins) {
	var _privateStoreProps = {
		_seenPlugins: [],
		_namespacePrefix: '',
		_namespaceRegexp: null,
		_legalNamespace: /^[a-zA-Z0-9_\-]+$/, // alpha-numeric + underscore and dash

		_storage: function() {
			if (!this.enabled) {
				throw new Error("store.js: No supported storage has been added! "+
					"Add one (e.g store.addStorage(require('store/storages/cookieStorage')) "+
					"or use a build with more built-in storages (e.g "+
					"https://github.com/marcuswestin/store.js/tree/master/dist/store.legacy.min.js)")
			}
			return this._storage.resolved
		},

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
	}

	var store = create(_privateStoreProps, storeAPI)
	each(storages, function(storage) {
		store.addStorage(storage)
	})
	each(plugins, function(plugin) {
		store.addPlugin(plugin)
	})
	return store
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	// Listed in order of usage preference
	'localStorage': __webpack_require__(22),
	'oldFF-globalStorage': __webpack_require__(24),
	'oldIE-userDataStorage': __webpack_require__(25),
	'cookieStorage': __webpack_require__(21),
	'sessionStorage': __webpack_require__(26),
	'memoryStorage': __webpack_require__(23),
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

var util = __webpack_require__(1)
var Global = util.Global
var trim = util.trim

module.exports = {
	name: 'cookieStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var doc = Global.document

function read(key) {
	if (!key || !_has(key)) { return null }
	var regexpStr = "(?:^|.*;\\s*)" +
		escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
		"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
	return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
	var cookies = doc.cookie.split(/; ?/g)
	for (var i = cookies.length - 1; i >= 0; i--) {
		if (!trim(cookies[i])) {
			continue
		}
		var kvp = cookies[i].split('=')
		var key = unescape(kvp[0])
		var val = unescape(kvp[1])
		callback(val, key)
	}
}

function write(key, data) {
	if(!key) { return }
	doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
	if (!key || !_has(key)) {
		return
	}
	doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
	each(function(_, key) {
		remove(key)
	})
}

function _has(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1)
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

module.exports = {
	name: 'memoryStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (var key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll(key) {
	memoryStorage = {}
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// oldFF-globalStorage provides storage for Firefox
// versions 6 and 7, where no localStorage, etc
// is available.

var util = __webpack_require__(1)
var Global = util.Global

module.exports = {
	name: 'oldFF-globalStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var globalStorage = Global.globalStorage

function read(key) {
	return globalStorage[key]
}

function write(key, data) {
	globalStorage[key] = data
}

function each(fn) {
	for (var i = globalStorage.length - 1; i >= 0; i--) {
		var key = globalStorage.key(i)
		fn(globalStorage[key], key)
	}
}

function remove(key) {
	return globalStorage.removeItem(key)
}

function clearAll() {
	each(function(key, _) {
		delete globalStorage[key]
	})
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// oldIE-userDataStorage provides storage for Internet Explorer
// versions 6 and 7, where no localStorage, sessionStorage, etc
// is available.

var util = __webpack_require__(1)
var Global = util.Global

module.exports = {
	name: 'oldIE-userDataStorage',
	write: write,
	read: read,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var storageName = 'storejs'
var doc = Global.document
var _withStorageEl = _makeIEStorageElFunction()
var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./) // MSIE 9.x, MSIE 10.x

function write(unfixedKey, data) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.setAttribute(fixedKey, data)
		storageEl.save(storageName)
	})
}

function read(unfixedKey) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	var res = null
	_withStorageEl(function(storageEl) {
		res = storageEl.getAttribute(fixedKey)
	})
	return res
}

function each(callback) {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		for (var i=attributes.length-1; i>=0; i--) {
			var attr = attributes[i]
			callback(storageEl.getAttribute(attr.name), attr.name)
		}
	})
}

function remove(unfixedKey) {
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.removeAttribute(fixedKey)
		storageEl.save(storageName)
	})
}

function clearAll() {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		storageEl.load(storageName)
		for (var i=attributes.length-1; i>=0; i--) {
			storageEl.removeAttribute(attributes[i].name)
		}
		storageEl.save(storageName)
	})
}

// Helpers
//////////

// In IE7, keys cannot start with a digit or contain certain chars.
// See https://github.com/marcuswestin/store.js/issues/40
// See https://github.com/marcuswestin/store.js/issues/83
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
function fixKey(key) {
	return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___')
}

function _makeIEStorageElFunction() {
	if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
		return null
	}
	var scriptTag = 'script',
		storageOwner,
		storageContainer,
		storageEl

	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		/* global ActiveXObject */
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storageEl = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storageEl = doc.createElement('div')
		storageOwner = doc.body
	}

	return function(storeFunction) {
		var args = [].slice.call(arguments, 0)
		args.unshift(storageEl)
		// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
		// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
		storageOwner.appendChild(storageEl)
		storageEl.addBehavior('#default#userData')
		storageEl.load(storageName)
		storeFunction.apply(this, args)
		storageOwner.removeChild(storageEl)
		return
	}
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1)
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);