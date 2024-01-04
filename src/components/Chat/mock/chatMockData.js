export const chatMockData = [
  {
    user: "bot",
    messages: [
      {
        text: "How can I help you today?",
        type: "text",
      },
    ],
  },
  {
    user: "user",

    messages: [
      {
        text: "I would like to but some ingridients for an apple pie.",
        type: "text",
      },
    ],
  },
  {
    user: "bot",

    messages: [
      {
        text: "Got it! I have the following cake recipes. Which one would you like to cook?",
        type: "text",
      },
      {
        type: "choice",
        choices: [
          {
            name: "Golden Apple Pie",
            img: "images/img02.png",
            weight: "1kg",
            time: "40 min",
            type: "recipe",
          },
          {
            name: "Classic Apple Pie",
            img: "images/img01.png",
            weight: "1kg",
            time: "40 min",
            type: "recipe",
          },
          
        ],
      },
    ],
  },
  {
    user: "user",
    messages: [
      {
        text: "I would like a Classic Pie Recipe",
        type: "text",
      },
    ],
  },
  {
    user: "bot",
    messages: [
      {
        text: "I can offer you these ingridients:",
        type: "text",
      },
      {
        type: "choice",
        choices: [
          {
            name: "Green Apples",
            amount: "2",
            img: "images/img03.png",
            price: "3.99",
            type: "ingredient",
          },
          {
            name: "Dough",
            amount: "2",
            img: "images/img04.png",
            price: "1.99",
            type: "ingredient",
          },
          {
            name: "Sugar",
            amount: "0.5",
            img: "images/img05.png",
            price: "1.79",
            type: "ingredient",
          },
        ],
      },
    ]
  },
  {
    user: "user",
    messages: [
      {
        text: "I would like to pay $5.98 for these ingridients with:",
        type: "text",
      },
    ],
  },
  {
    user: "bot",
    messages: [{ text: "You're welcome! Enjoy baking!", type: "text" }],
  },
];
