
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:"cpowys0",password:"0wdpse6zi"},
        {username:"jlyndon1",password:"f3csFHGh"},
        {username:"bkyle2",password:"YyJf7I2vd"},
        {username:"sdack3",password:"7BUBYtr"},
        {username:"rstaner4",password:"QXVLwj"},
        {username:"lgartrell5",password:"kYFuKtoZxO"},
        {username:"gdashper6",password:"eD6j4ew"},
        {username:"drankmore7",password:"G0Ajhke"},
        {username:"aslot8",password:"wbcxmkxhgmyp"},
        {username:"jquirk9",password:"ZHMdZWXsL9x"},
      ]);
    });
};
