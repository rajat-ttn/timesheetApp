var User = {
  schema: true,

  attributes: {
    uid : { type: 'string', unique: true }
    , name : { type: 'string' }
    , email : { type: 'email',  unique: true }
    , image : { type: 'string' }
  }
};

module.exports = User;
