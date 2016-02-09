## CheckVist API Wrapper for node.js

Under development, this is a draft release. 


## Current Implementations:

* Login API
* Get Lists API
* Get ListItems API
* Update Item API


### Usage

```
const checkvist = require('./checkvist.js');
const credentials = {
  username: '', // email
  key: '', // API Key
};

checkvist.login(credentials, (token) => {
  checkvist.getLists({token: token}, (lists) => {
    var listId = lists[0].id;

    checkvist.getListItems({token: token, id: listId}, (tasks) => {
      console.log(tasks);
    });
  });
});
```
