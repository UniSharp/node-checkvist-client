const querystring = require('querystring');
const https = require('https');
const debug = false;

var log = (msg, force) => {
  if (debug || force) {
    console.log(msg);
  }
};

var error = (msg) => {
  log(msg, true);
};


var httpClient = {
  send: (options, inputParams, callback) => {
    log(options);
    var requestData = querystring.stringify(inputParams);

    var req = https.request(options, (res) => {
      var responseData = '';
      log(`STATUS: ${res.statusCode}`);
      log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunkData) => {
        log(`BODY: ${chunkData}`);
        responseData += chunkData;
      });
      res.on('end', () => {
        log('No more data in response.');
        callback(responseData);
      });
    });

    req.on('error', (e) => {
      error(`problem with request: ${e.message}`);
    });

    // write data to request body
    log('requestData:');
    log(requestData);
    req.write(requestData);
    req.end();
  }
};

var getOptions = (input) => {
  if (!input) {
    input = {};
  }
  var options = {
    hostname: 'checkvist.com',
    port: 443,
    path: '/auth/login.json',
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json',
      //'Content-Length': postData.length
    }
  };
  return Object.assign({}, options, input);
};


exports.login = (input, callback) => {
  const username = input.username;
  const key = input.key;

  var postData = {
    'username' : username,
    'remote_key' : key,
  };

  var options = getOptions();
  httpClient.send(options, postData, (responseData) => {
    var token = responseData.replace(new RegExp('"', 'g'), '');
    callback(token);
  });
};


// get lists
exports.getLists = (input, callback) => {
  token = input.token;
  var options = getOptions({
    path: '/checklists.json?token=' + token,
    method: 'GET',
  });
  httpClient.send(options, {}, (response) => {
    callback(JSON.parse(response));
  });
};



// get listItems
exports.getListItems = (input, callback) => {
  var token = input.token;
  var id = input.id;
  var options = getOptions({
    path: '/checklists/' + id + '/tasks.json?token=' + token,
    method: 'GET',
  });
  httpClient.send(options, {}, (response) => {
    callback(JSON.parse(response));
  });
};


exports.updateListItem = (input, callback) => {
  var token = input.token;
  var checklistId = input.checklistId;
  var taskId = input.taskId;
  var task = input.task;

  var inputParams = {
    'token': token,
    task: task,
  };

  var options = getOptions({
    path: '/checklists/' + checklistId + '/tasks/' + taskId + '.json',
    method: 'PUT',
  });

  httpClient.send(options, inputParams, (response) => {
    callback(JSON.parse(response));
  });

};
