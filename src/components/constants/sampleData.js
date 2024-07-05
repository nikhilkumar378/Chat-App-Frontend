

export const sampleChats = [
  {
    avatar: [
      "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg",
    ],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: [
      "https://tse4.mm.bing.net/th?id=OIP.mfmo9SmdoGuS-iJqOi8wdQHaIt&pid=Api&P=0&h=180",
    ],
    name: "John Boi",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: [
      "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg",
    ],
    name: "John Doe",
    _id: "1",
  },

  {
    avatar: [
      "https://tse4.mm.bing.net/th?id=OIP.mfmo9SmdoGuS-iJqOi8wdQHaIt&pid=Api&P=0&h=180",
    ],
    name: "John Boi",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: [
        "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg",
      ],
      name: "John Doe",
    },
    _id: "1",
  },

  {
    sender: {
      avatar: [
        "https://tse4.mm.bing.net/th?id=OIP.mfmo9SmdoGuS-iJqOi8wdQHaIt&pid=Api&P=0&h=180",
      ],
      name: "John Boi",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "dsa",
        url: "https://tse4.mm.bing.net/th?id=OIP.mfmo9SmdoGuS-iJqOi8wdQHaIt&pid=Api&P=0&h=180",
      },
    ],

    content: "Hey Nce to  meet you",
    _id: "dfvgdfv",
    sender: {
      _id: "user._id",
      name: "chaman",
    },

    chat: "chatId",
    createdAt: "2024-05-06T00:00:00.000Z",
  },

  {
    attachments: [
      {
        public_id: "dsa2",
        url: "https://tse4.mm.bing.net/th?id=OIP.mfmo9SmdoGuS-iJqOi8wdQHaIt&pid=Api&P=0&h=180",
      },
    ],

    content: "Hey Nce to 2 meet you",
    _id: "dfvgdfv2",
    sender: {
      _id: "hgfhffh",
      name: "chaman2",
    },

    chat: "chatId",
    createdAt: "2024-05-06T00:00:00.000Z",
  },
];


export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg",
      _id: "1",
      username: "john Doe",
      friends:20,
      groups:5
    },



    {
      name: "John Boi",
      avatar: "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg",
      _id: "2",
      username: "john Doe",
      friends:20,
      groups:5
    }
  ],


  chats: [{
    name: "Nikhil Boi",
    avatar: ["https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg"],
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
    totalmembers: 2,
    totalmessages: 20,
    creator:{
     name: "john Doe",
     avatar: "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg"
    }
  },


  {
    name: "John Boi",
    avatar: ["https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg"],
    _id: "2",
    groupChat: true,
    members: ["1", "3"],
    totalmembers: 6,
    totalmessages: 60,
    creator:{
     name: "Nill Arm",
     avatar: "https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/ms-dhoni-6.jpg"
    }
  }]
}


