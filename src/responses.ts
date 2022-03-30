export const categories = {
  Type: "keyboard",
  Buttons: [
    {
      Columns: 2,
      Rows: 2,
      ActionType: "reply",
      ActionBody: "category: doctor",
      Text: "Doctor",
      TextSize: "large",
      TextVAlign: "bottom",
      Image: "http://clipartmag.com/images/stethoscope-clipart-free-8.jpg",
    },
    {
      Columns: 2,
      Rows: 2,
      ActionType: "reply",
      ActionBody: "category: concert",
      Text: "Concert",
      TextSize: "large",
      TextVAlign: "bottom",
      Image:
        "https://www.zmonline.com/media/16545271/screen-shot-2016-07-12-at-111951-am-1468336900.jpg",
    },
    {
      Columns: 2,
      Rows: 2,
      ActionType: "reply",
      ActionBody: "category: flight",
      Text: "Flight",
      TextSize: "large",
      TextVAlign: "bottom",
      Image:
        "https://www.xtrafondos.com/wallpapers/buzz-lightyear-volando-en-toy-story-4-3327.jpg",
    },
  ],
};

export const doctors = {
  ques: "With whom would you like to schedule appointment?",
  date_ques: "When would you like to schedule appointment with Dr.",
  keyboard: {
    Type: "keyboard",
    Buttons: [
      {
        Columns: 3,
        Rows: 2,
        BgColor: "#e6f5ff",
        ActionType: "reply",
        ActionBody: "doctor: jessie",
        Text: '<font color="#000000">Dr. Jessie</font>',
        TextSize: "large",
        TextVAlign: "bottom",
        Image:
          "https://cdna.artstation.com/p/assets/images/images/027/898/434/large/orlando-esquivel-render6.jpg",
      },
      {
        Columns: 3,
        Rows: 2,
        BgColor: "#e6f5ff",
        ActionType: "reply",
        ActionBody: "doctor: potato",
        Text: '<font color="#000000">Dr. Potato</font>',
        TextSize: "large",
        TextVAlign: "bottom",
        Image:
          "https://cdn11.bigcommerce.com/s-5ylnei6or5/images/stencil/1280x1280/products/1990/5063/2937_MrPotatoHead_TS4_40__87921.1559322015.jpg",
      },
    ],
  },
};

export const concerts = {
  ques: "What concert would you like to book?",
  date_ques: "When would you like to see",
  keyboard: {
    Type: "keyboard",
    Buttons: [
      {
        Columns: 3,
        Rows: 2,
        ActionType: "reply",
        ActionBody: "concert: rex",
        Text: '<font color="#ffffff">The Rex Show</font>',
        TextSize: "large",
        TextVAlign: "bottom",
        Image:
          "http://simplywallpaper.net/pictures/2010/07/16/wp2_rex_ts3_1600x1200.jpg",
      },
      {
        Columns: 3,
        Rows: 2,
        ActionType: "reply",
        ActionBody: "concert: wheezy",
        Text: '<font color="#ffffff">Wheezy\'s Musical</font>',
        TextSize: "large",
        TextVAlign: "bottom",
        Image:
          "http://vignette1.wikia.nocookie.net/pixar/images/e/ed/Wheezy_012.jpg/revision/latest?cb=20130528224749",
      },
    ],
  },
};

export const flights = {
  ques: "Welcome to Buzz's Flight! Where would you like to fly?",
  date_ques: "When would you like to fly",
  keyboard: {
    Type: "keyboard",
    Buttons: [
      {
        Columns: 3,
        Rows: 2,
        ActionType: "reply",
        ActionBody: "flight: barn",
        Text: "Al's Toy Barn",
        TextSize: "medium",
        TextVAlign: "top",
        Image:
          "https://static.wikia.nocookie.net/disney/images/1/14/Al%27s_Toy_Barn.jpg",
      },
      {
        Columns: 3,
        Rows: 2,
        ActionType: "reply",
        ActionBody: "flight: apartment",
        Text: "Al's Apartment",
        TextSize: "medium",
        TextVAlign: "top",
        Image:
          "https://static.wikia.nocookie.net/disney/images/a/a2/Al%27s_Apartment.png",
      },
    ],
  },
};

export const date_format = ' Date should be in this format: "dd/mm/yy".';
export const time_format = ' Time should be in this format: "hh:mm am/pm".';
