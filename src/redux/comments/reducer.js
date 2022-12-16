import { GET_COMMENTS, ADD_COMMENT } from "./types";

const allComments = [
  {
    id: 1,
    name: "Arda",
    time: "1633290470",
    message: "Some random comments posted by the users.",
  },
  {
    id: 2,
    name: "Susi",
    time: "1631628821",
    message:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  },
  {
    id: 3,
    name: "Dex",
    time: "1625347479",
    message:
      "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
  },
  {
    id: 4,
    name: "Gloriana",
    time: "1627468937",
    message: "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
  },
  {
    id: 5,
    name: "Corrie",
    time: "1628386017",
    message: "Ut at dolor quis odio consequat varius.",
  },
  {
    id: 6,
    name: "Marion",
    time: "1653455179",
    message:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  },
  {
    id: 7,
    name: "Byrle",
    time: "1654950185",
    message:
      "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
  },
  {
    id: 8,
    name: "Padriac",
    time: "1626084373",
    message:
      "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
  },
  {
    id: 9,
    name: "Jordanna",
    time: "1639698174",
    message:
      "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
  },
  {
    id: 10,
    name: "Lola",
    time: "1647007695",
    message:
      "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
];

const initialState = {
  commnets: allComments,
};

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
      };
    case ADD_COMMENT:
      const newCommnet = {
        id: Date.now(),
        name: "James",
        time: Date.now() / 1000,
        message: action.data.message,
      };
      return {
        ...state,
        commnets: [...state.commnets, newCommnet],
      };

    default:
      return state;
  }
};

export default cakeReducer;
