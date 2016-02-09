const checkvist = require('./checkvist.js');
const credentials = {
  username: '',
  key: '',
};

checkvist.login(credentials, (token) => {
  checkvist.getLists({token: token}, (lists) => {
    var listId = lists[0].id;

    checkvist.getListItems({token: token, id: listId}, (tasks) => {
      console.log(tasks);
    });
  });
});
