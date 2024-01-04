// import { Search } from "../../assets/images/svg";
import { useState, useRef, useEffect, useContext } from "react";
import { getChatResponse } from "../../utils/apiCalls";
import "./Chat.css";
import { Send, ShoppingCartIcon } from "lucide-react";
import { chatContext } from "../../context/chatContext";
import { Time, Weight, Done } from "../../assets/svg";

const chatRecomedations = {
  "Start Page": [
    "Hi, can you help me to find a recipe?",
    "Hello, what can you help with?",
  ],
  "Get Dish Name": ["I would like to cook a Lasagna", "I want to cook a Pasta"],
};

const ChatOverlay = ({ message, index, children }) => {
  return (
    <div
      key={index}
      className={`chat-message-box ${message.user === "bot" ? "bot-block" : "user-block"
        }`}
    >
      {message.user === "bot" ? (
        <div className="chat__avatar-wrapp">
          <p className="chat__avatar-text">The Chef</p>
        </div>
      ) : null}
      {message.user === "user" ? (
        <div className="chat__avatar-wrapp">
          <p className="chat__avatar-textYou">YOU</p>
        </div>
      ) : null}
      <div
        className={`chat__avatar-box ${message.user === "user" ? "chat__avatar-box--user" : ""
          }`}
      >
        {message.user === "bot" ? (
          <div className="chat__avatar">
            <img
              src="images/chef.png"
              alt="Robot Icon"
              className="bot-icon"
              width="45"
              height="45"
            />
          </div>
        ) : null}
        <div className="chat__chef-box">{children}</div>
      </div>
    </div>
  );
};

const ChatText = ({ message, children }) => {
  return (
    <div
      className={`chat-message ${message.user === "bot" ? "bot-message" : "user-message"
        }`}
    >
      <p className="chat__text">{children}</p>
    </div>
  );
};

const ChatChoiceRecipe = ({
  message,
  choice,
  handleChooseRecipe,
  recipeChoice,
}) => {
  return (
    <div
      className={`chat__choice-element ${choice.status === "active" ? "active-message" : "inactive-message"
        }`}
      onClick={() => {
        if (recipeChoice) return;
        handleChooseRecipe(choice.name, message, choice);
      }}
    >
      <div className="chat__choice-image">
        <img src={choice.img} alt="choice" className="chat__choice-image" />
      </div>
      <div className="chat__choice-text">
        <p className="chat__choice-name">{choice.name}</p>
        <div className="chat__choice-additional">
          <div className="chat__choice-time chat__aditional-data">
            <Time />
            <p className="chat__choice-time-text">{choice.time}</p>
          </div>
          <div className="chat__choice-weight chat__aditional-data">
            <Weight />
            <p className="chat__choice-weight-text">{choice.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatChoiceIngredient = ({ choice, message, handleChooseIngredient }) => {
  return (
    <div
      className={`chat__choice-element ${choice.status === "active" ? "active-message" : "inactive-message"
        }`}
      onClick={() => {
        handleChooseIngredient(choice.name, message, choice);
      }}
    >
      <div className="chat__choice-image">
        <img src={choice.img} alt="choice" className="chat__choice-image" />
      </div>
      <div className="chat__choice-text">
        <p className="chat__choice-name">{choice.name}</p>
        <div className="chat__choice-additional">
          <div className="chat__choice-weight chat__aditional-data">
            <Weight />
            <p className="chat__choice-weight-text">{choice.weight}</p>
          </div>
          <div className="chat__choice-price chat__aditional-data">
            <p className="chat__choice-price-text">{choice.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function Chat() {
  const chatContainerRef = useRef(null);
  // const [search, setSearch] = useState("");
  // const [sessionId, setSessionId] = useState("");

  // const [chatData, setChatData] = useState([]);

  // const [recipeChoice, setRecipeChoice] = useState(false);

  // const [currentPage, setCurrentPage] = useState("Start Page");

  // const {cart, setCart, setCartOpen} = useContext(cartContext);
  // const [showCartIcon, setShowCartIcon] = useState(false);
  const { search,
    setSearch,
    sessionId,
    setSessionId,
    chatData,
    setChatData,
    recipeChoice,
    setRecipeChoice,
    showCartIcon,
    setShowCartIcon,
    currentPage,
    setCurrentPage,
    cart,
    setCart,
    setCartOpen
  } = useContext(chatContext);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const onEnterPress = async ({ keyCode }) => {
    if (keyCode === 13) {
      if (search !== "") {
        // Handle text input
        const userMessage = search;

        handleSendMessage(userMessage);
      } else {
      }
    }
  };

  const handleSendMessage = async (userMessage) => {
    console.log("handleSendMessage");
    setSearch("");
    setChatData((prev) => [
      ...prev,
      { user: "user", messages: [{ text: userMessage, type: "text" }] },
    ]);

    const result = await getChatResponse(userMessage, sessionId);
    const { data, sessionId: sessionIdFromServer, currentPage } = result;
    console.log(result);

    setCurrentPage(currentPage ? currentPage : null);

    if (sessionIdFromServer !== sessionId) {
      setSessionId(sessionIdFromServer);
    }

    const botMessages = [];

    for (const message of data) {
      if (message) {
        botMessages.push({
          type: "text",
          text: message,
        });
      }
    }

    setChatData((prev) => [
      ...prev,
      {
        user: "bot",
        messages: botMessages,
      },
    ]);

    if (currentPage === "Get Chosen Recipe") {
      console.log("Get Chosen Recipe");
      setChatData((prev) => {
        console.log("prev", prev);
        const newData = JSON.parse(JSON.stringify(prev));

        newData[newData.length - 1].messages.splice(2, 0, {
          type: "choice",
          choices: result["user_fields"].recipes.listValue.values.map(
            (recipe) => {
              return {
                name: recipe.structValue.fields.name.stringValue,
                img: recipe.structValue.fields.img.stringValue,
                weight: recipe.structValue.fields.weight.stringValue,
                time: recipe.structValue.fields.timeToCook.stringValue,
                type: "recipe",
                status: "inactive",
              };
            }
          ),
        });

        return newData;
      });
    } else if (currentPage === "Get Ingredients") {
      console.log("Get Ingredients");
      setChatData((prev) => {
        console.log("prev", prev);
        const newData = JSON.parse(JSON.stringify(prev));

        newData[newData.length - 1].messages.splice(2, 0, {
          type: "choice",
          choices: result["user_fields"].ingredients.listValue.values.map(
            (recipe) => {
              // console.log("recipe", recipe);
              setCart((prev) => {
                const newCart = JSON.parse(JSON.stringify(prev));
                if (newCart.find((item) => item.name === recipe.structValue.fields.name.stringValue)) {

                } else {
                  newCart.push({
                    name: recipe.structValue.fields.name.stringValue,
                    // img: recipe.structValue.fields.img.stringValue,
                    img: "https://www.foodingredientfacts.org/wp-content/uploads/2019/04/AdobeStock_283156247-a-how-to-guide-to-the-ingredient-list-1-e1579114065189.jpeg",
                    weight: recipe.structValue.fields.weight.stringValue,
                    price: recipe.structValue.fields.price.stringValue,
                  });
                }
                return newCart;
              });
              return {
                name: recipe.structValue.fields.name.stringValue,
                // img: recipe.structValue.fields.img.stringValue,
                img: "https://www.foodingredientfacts.org/wp-content/uploads/2019/04/AdobeStock_283156247-a-how-to-guide-to-the-ingredient-list-1-e1579114065189.jpeg",
                weight: recipe.structValue.fields.weight.stringValue,
                price: recipe.structValue.fields.price.stringValue,
                type: "ingredient",
                status: "active",
              };
            }
          ),
        });

        return newData;
      });
      setShowCartIcon(true)
      // setCartOpen(true)
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  const onSendClick = () => {
    onEnterPress({ keyCode: 13 });
  };

  const handleChooseRecipe = (recipe, message, choice) => {
    handleSendMessage(recipe);
    setChatData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));

      const chosenMessage = newData.find(
        (item) => JSON.stringify(item) === JSON.stringify(message)
      );

      console.log("chosenMessage", chosenMessage);

      const chosenChoice = chosenMessage.messages[2].choices.find(
        (item) => JSON.stringify(item) === JSON.stringify(choice)
      );

      console.log("chosenChoice", chosenChoice);

      chosenChoice.status = "active";

      console.log("newData", newData);

      return newData;
    });

    setRecipeChoice(true);
  };

  const handleChooseIngredient = (ingredient, message, choice) => {
    if (cart.find((item) => item.name === ingredient)) {
      setCartOpen(true)
      return;
    }

    setCart((prev) => {
      const newCart = JSON.parse(JSON.stringify(prev));

      newCart.push({
        name: ingredient,
        weight: choice.weight,
        price: choice.price,
        img: choice.img,
      });
      setCartOpen(true)
      return newCart;
    });

    setChatData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));

      const chosenMessage = newData.find(
        (item) => JSON.stringify(item) === JSON.stringify(message)
      );

      console.log("chosenMessage", chosenMessage);

      const chosenChoice = chosenMessage.messages[2].choices.find(
        (item) => JSON.stringify(item) === JSON.stringify(choice)
      );

      console.log("chosenChoice", chosenChoice);

      chosenChoice.status = "active";

      console.log("newData", newData);

      return newData;
    });
  };

  const handleClickRecommendation = (recommendation) => {
    handleSendMessage(recommendation);
  };

  return (
    <div className="chat">
      <div
        className="chat-container"
        onDragOver={(e) => e.preventDefault()}
        ref={chatContainerRef}
      >
        {chatData.map((message, index) => {
          const result = (
            <ChatOverlay key={index} message={message} index={index}>
              {message.messages.map((userMessage, index) => {
                return (
                  <div key={index}>
                    {userMessage.type === "text" ? (
                      <ChatText message={message} index={index}>
                        {userMessage.text}
                      </ChatText>
                    ) : null}
                    {userMessage.type === "choice" ? (
                      <div className="chat__chef-offer" index={index}>
                        <div className="chat__offer-container">
                          {userMessage.choices.map((choice, index) => {
                            return choice.type === "ingredient" ? (
                              <ChatChoiceIngredient
                                choice={choice}
                                handleChooseIngredient={handleChooseIngredient}
                                message={message}
                                key={index}
                              />
                            ) : (
                              <ChatChoiceRecipe
                                key={index}
                                choice={choice}
                                message={message}
                                index={index}
                                handleChooseRecipe={handleChooseRecipe}
                                recipeChoice={recipeChoice}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </ChatOverlay>
          );

          return result;
        })}
      </div>
      {chatRecomedations.hasOwnProperty(currentPage) ? (
        <div className="chat__help">
          <div className="chat__help-box">
            {chatRecomedations[currentPage].map((item, index) => (
              <div
                className="chat__help-message"
                key={index}
                onClick={() => handleClickRecommendation(item)}
              >
                <p className="chat__help-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="chat__input">
        <input
          className="chat-search"
          type="text"
          placeholder={showCartIcon ? '' : 'Please start typing here…'}
          value={search}
          onChange={onSearchChange}
          onKeyDown={onEnterPress}
          disabled={showCartIcon}
        />
        {
          showCartIcon ? (
            <div className="chat-button" onClick={(e) => setCartOpen(true)} style={{ cursor: 'pointer' }}>
              <ShoppingCartIcon color="#fff" />
            </div>
          ) : (
            <div className="chat-button" onClick={onSendClick}>
              <Send color="#fff" />
            </div>
          )
        }

      </div>
    </div>
  );
}

export default Chat;
