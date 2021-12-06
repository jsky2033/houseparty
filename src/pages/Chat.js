import React, { useState, useEffect } from "react";

//firebase initialization function
import firebase from "firebase/compat/app";

//use auth context
import { useAuth } from "../contexts/AuthContext";

//import firebase database connect and auth
import { db, auth } from "../firebase";

//import components
import SendMessage from "../components/SendMessage";

//Bootstrap
import { Image, Col, Container, Button } from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

export default function Chat({ match }) {
  //getting user data from context
  const { currentUser, currentUserData } = useAuth();

  const [messages, setMessages] = useState([]);
  const [numDisplay, setNumDisplay] = useState(5);

  //USE EFFECT
  useEffect(() => {
    const getMessages = async () => {
      //id for the house
      const dbId = match.params.dbId;
      //reference for messages collection
      const messageRef = await db.collection("chatrooms");
      //check if a chat document for this house exists already
      const houseChat = await messageRef.doc(dbId);
      //if no chat exists for this house (house has just been created), create a chat
      if (!houseChat.exists) {
        let chatRoomRef = await messageRef.doc(dbId).collection("messages");

        await chatRoomRef
          .doc("startConvo")
          .set({ text: "Please be respectful towards each other" });
      }
      //if chat already exists, then display this chat
      const messageCol = await messageRef
        .doc(dbId)
        .collection("messages")
        .orderBy("createdAt")
        .limitToLast(numDisplay);
      messageCol.onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    };

    getMessages();

    return () => {};
  }, [numDisplay, match]);

  //API REQUESTS
  const sendMessage = async (msg, setMsg) => {
    const { uid } = auth.currentUser;
    //id for the house
    const dbId = match.params.dbId;
    //reference for chatroomm collection
    const messageRef = await db.collection("chatrooms");
    //if no chat exists for this house (house has just been created), create a chat
    let chatRoomRef = await messageRef.doc(dbId).collection("messages");

    await chatRoomRef.add({
      text: msg,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: currentUserData.username,
    });

    setMsg("");
  };

  if (currentUser) {
    return (
      <Container>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="chat" />
            House Chat
          </Header>
        </Divider>
        {messages.length ? (
          <Button
            onClick={() => setNumDisplay(numDisplay + 10)}
            style={{ width: "100%" }}
            variant="secondary"
          >
            Load More Messages
          </Button>
        ) : (
          <h2 className="text-center">
            This is the start of your wonderful conversation!
          </h2>
        )}

        <div className="d-flex flex-column">
          {messages.map(({ createdAt, text, name, uid }) => {
            return (
              <div key={createdAt}>
                {uid !== currentUser.uid ? (
                  <div className="msg">
                    <Image
                      style={{ width: "5em" }}
                      fluid
                      src={"/pictures/profile/default/m_avatar.svg"}
                    />
                    <Col>
                      <strong>{name}</strong>
                      <p>{text}</p>
                    </Col>
                  </div>
                ) : (
                  <div className="msg-user">
                    <Col>
                      <strong>{name}</strong>
                      <p >{text}</p>
                    </Col>
                    <Image
                      style={{ width: "5em" }}
                      fluid
                      src={"/pictures/profile/default/m_avatar.svg"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <SendMessage sendMessage={sendMessage} />
      </Container>
    );
  } else {
    return null;
  }
}
