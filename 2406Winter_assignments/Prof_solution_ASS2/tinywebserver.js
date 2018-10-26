// tinyweb.js (formerly tinywebserver.js)
//
// Extended with functionality for Carleton COMP 2406 2016W Assignment 2
// Solutions by Anil Somayaji, January 22, 2016
//
// A modification of Rod Waldhoff's tiny node.js webserver
// original written in coffeescript
// simplified and made more native-ish by Anil Somayaji
// March 19, 2014
//
// original headers of coffeescript version:
//
// A simple static-file web server implemented as a stand-alone
// Node.js/CoffeeScript app.
//---------------------------------------------------------------------
// For more information, see:
// <https://github.com/rodw/tiny-node.js-webserver>
//---------------------------------------------------------------------
// This program is distributed under the "MIT License".
// (See <http://www.opensource.org/licenses/mit-license.php>.)
//---------------------------------------------------------------------
// Copyright (c) 2012 Rodney Waldhoff
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//---------------------------------------------------------------------

var path = require('path');
var http = require('http');
var fs = require('fs');
var Console = require('console').Console;

var logStream;
var myConsole;
var errorPage;

var MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

var default_options = {
    host: 'localhost',
    port: 8080,
    index: 'index.html',
    docroot: '.'
};

var options;

var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return null;
};

var log_headers = function(request) {
    options["logged-headers"].forEach(function(h) {
	if (request.headers[h]) {
	    myConsole.log("   " + h + ": " + request.headers[h]);
	}
    });
}

var respond = function(request, response, status, content, content_type) {
    if (!status) {
        status = 200;
    }

    if (!content_type) {
        content_type = 'text/plain';
    }
    myConsole.log("" + status + "\t" +
                request.method + "\t" + request.url);

    log_headers(request);

    response.writeHead(status, {
        "Content-Type": content_type
    });
    if (content) {
        response.write(content);
    }
    return response.end();
};

var respond_error = function(request, response, status) {
    respond(request, response, status, errorPage, "text/html");
}

var serve_file = function(request, response, requestpath, successcode) {
    return fs.readFile(requestpath, function(error, content) {
        if (error != null) {
            myConsole.error("ERROR: Encountered error while processing " +
                          request.method + " of \"" + request.url +
                          "\".", error);
            return respond_error(request, response, 500);
        } else {
            return respond(request, response, successcode,
                           content, get_mime(requestpath));
        }
    });
};


var return_index = function(request, response, requestpath, successcode)  {

    var exists_callback = function(file_exists) {
        if (file_exists) {
            return serve_file(request, response, requestpath, successcode);
        } else {
            return respond_error(request, response, 404);
        }
    }

    if (requestpath.substr(-1) !== '/') {
        requestpath += "/";
    }
    requestpath += options.index;
    return fs.exists(requestpath, exists_callback);
}

var request_handler = function(request, response) {
    var requestpath, responsecode, url;

    debugger;
    url = request.url;

    if (options.aliases.hasOwnProperty(url)) {
	myConsole.log("Aliasing " + url + " to " + options.aliases[url]);
	url = options.aliases[url];
    }

    if (url.match(/((\.|%2E|%2e)(\.|%2E|%2e))|(~|%7E|%7e)/) != null) {
        myConsole.warn("WARNING: " + request.method +
                     " of \"" + url +
                     "\" rejected as insecure.");
        return respond_error(request, response, 403);
    } else {
        requestpath = path.normalize(path.join(options.docroot, url));
        return fs.exists(requestpath, function(file_exists) {
            if (file_exists) {
                return fs.stat(requestpath, function(err, stat) {
                    if (err != null) {
                        myConsole.error("ERROR: Encountered error calling" +
                                      "fs.stat on \"" + requestpath +
                                      "\" while processing " +
                                      request.method + " of \"" +
                                      url + "\".", err);
                        return respond_error(request, response, 500);
                    } else {
			if (requestpath.search(/lucky/) > -1) {
			    successcode = 777;
			} else {
			    successcode = 200;
			}
                        if ((stat != null) && stat.isDirectory()) {
                            return return_index(request, response,
						requestpath, successcode);
                        } else {
                            return serve_file(request, response, requestpath,
					     successcode);
                        }
                    }
                });
            } else {
                return respond_error(request, response, 404);
            }
        });
    }
};

var optionsFilename = process.argv[2];

try {
    options = JSON.parse(fs.readFileSync(optionsFilename, "utf-8"));
    if (options.logfile) {
	logStream = fs.createWriteStream(options.logfile, {'flags': 'a'});
    }
    if (options.errorpage) {
	errorPage = fs.readFileSync(options.errorpage, "utf-8");
    }
} catch (e) {
    if (optionsFilename) {
	console.error("Error reading/parsing options file " + optionsFilename +
		    ", using defaults.");
    } else {
	console.log("No options file specified, using defaults.");
    }
    options = default_options;
}

if (!logStream) {
    logStream = process.stdout;
}
myConsole = new Console(logStream);

if (!options.aliases) {
    options.aliases = {};
}

var server = http.createServer(request_handler);

server.listen(options.port, options.host, function() {
    return myConsole.log("Server listening at http://" +
                       options.host + ":" + options.port + "/");
});
