db.gamers.insertMany([
  {
    id: 1,
    uname: "fal7h3",
    password: "fal7h3",
    email: "fal7h3@gmail.com",
    games: {
      dota2: {
        player_id: 339305517,
        rev_rank: "Legend 2"
      },
      csgo: {
        player_id: 14123412,
        rev_rank: "Gold Nova 2"
      }
    },
    teams: {
      1708: {
        game: "Dota 2",
        type: "Casual"
      }
    },
    date_created: Date()
  },
  {
    id: 2,
    uname: "Muezza",
    password: "Muezza",
    email: "Muezza@gmail.com",
    games: {
      dota2: {
        player_id: 339305518,
        rev_rank: "Ancient 2"
      },
      csgo: {
        player_id: 14123413,
        rev_rank: "Gold Nova 3"
      }
    },
    teams: {
      1708: {
        game: "Dota 2",
        type: "Casual"
      }
    },
    date_created: Date()
  },
  {
    id: 3,
    uname: "Morpheus",
    password: "Morpheus",
    email: "Morpheus@gmail.com",
    games: {
      dota2: {
        player_id: 339305519,
        rev_rank: "Archon 5"
      },
      csgo: {
        player_id: 14123414,
        rev_rank: "Gold Nova 1"
      }
    },
    teams: {
      1708: {
        game: "Dota 2",
        type: "Casual"
      }
    },
    date_created: Date()
  },
]);

