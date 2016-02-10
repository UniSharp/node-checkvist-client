## CheckVist API Wrapper for node.js

Under development, this is a draft release. 


## Current Implementations:

* Login API
* Get Lists API
* Get ListItems API
* Update Item API


### Usage

`npm install checkvist-client`

```
const checkvist = require('checkvist-client');
const credentials = {
  username: '', // email
  key: '', // API Key
};

checkvist.login(credentials, (token) => {
  checkvist.getLists({token: token}, (lists) => {
    var listId = lists[0].id;

    checkvist.getListItems({token: token, id: listId}, (tasks) => {
      console.log(tasks);

      var options = {
        token: token,
        checklistId: listId,
        taskId: tasks[0].id
      };
      var task = {
        'task[content]': 'updated ' + tasks[t].content,
        'task[tags]': 'newTag'
      }
      checkvist.updateListItem(options, task, function(d) {console.log(d);});
    });
  });
});
```
