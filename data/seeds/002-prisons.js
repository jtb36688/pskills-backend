
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisons').del()
    .then(function () {
      // Inserts seed entries
      return knex('prisons').insert([
        {id:1,name:"Boston Prison",location:18820,phoneNumber:"660-980-2576"},
        {id:2,name:"Minneapolis Correctional Facility",location:29198,phoneNumber:"839-032-0936"},
        {id:3,name:"St. Paul Jail",location:30618,phoneNumber:"891-183-3146"},
        {id:4,name:"Chicago Prison",location:26664,phoneNumber:"676-325-1021"},
        {id:5,name:"Seattle Prison",location:41419,phoneNumber:"106-069-3815"},
        {id:6,name:"New York Prison",location:25806,phoneNumber:"624-915-4842"},
        {id:7,name:"Orlando Jail",location:41398,phoneNumber:"332-574-1985"},
        {id:8,name:"Alcatraz Island",location:70977,phoneNumber:"208-153-3969"},
        {id:9,name:"Ward Prison",location:58520,phoneNumber:"278-247-4802"},
        {id:10,name:"Stroman-Dare Prison",location:96647,phoneNumber:"061-304-0728"},
      ]);
    });
};
