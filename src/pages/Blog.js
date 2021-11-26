import React, { useState, useEffect } from "react";

//bootstrap
import { Container, Row, Col, Card, Modal } from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//components
import PostForm from "../components/Forms/PostForm";

//requests
import PostAPI from "../requests/PostAPI";

//use auth context
import { useAuth } from "../contexts/AuthContext";

export default function Blog() {
  //getting user data from context
  const { currentUser } = useAuth();

  //STATE
  const [postStatus, setPostStatus] = useState(null);
  const [posts, setPosts] = useState([]);

  const [showPost, setShowPost] = useState(null);
  const handleClose = () => {
    setShowPost(null);
  };

  const [selectedPost, setSelectedPost] = useState(null);

  //STYLES
  const styles = {
    postCard: {
      marginBottom: "3em",
    },
  };

  //USE EFFECT

  useEffect(() => {
    let isActive = true;

    const getPosts = async () => {
      const response = await PostAPI.get(`/${currentUser.uid}`);
      setPosts(response.data);
    };

    if (isActive) {
      getPosts();
    }

    return () => (isActive = false);
  }, [currentUser, postStatus]);

  //EVENT HANDLERS

  //submit or edit post
  const onSubmit = async (postData, edit) => {
    try {
      setPostStatus("PENDING");
      var response;
      var endStatus;
      if (!edit) {
        const randomNum = Math.floor(Math.random() * 7);
        response = await PostAPI.post(`/${currentUser.uid}`, {
          ...postData,
          authId: currentUser.uid,
          pictureIndex: randomNum,
        });
        endStatus = "SUCCESS_POST";
      } else {
        response = await PostAPI.put(`/${currentUser.uid}`, {
          ...postData,
          postId: selectedPost.postId,
          authId: currentUser.uid,
        });
        endStatus = "SUCCESS_EDIT";
      }
      if (response.status === 200) {
        setPostStatus(endStatus);
      }
    } catch (err) {
      setPostStatus("FAIL");
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await PostAPI.delete(`/${currentUser.uid}`, {
        data: {
          postId: postId,
          authId: currentUser.uid,
        },
      });
      if (response.status === 200) {
        setPostStatus(`SUCCESS_DELETE on ${postId}`);
      }
    } catch (err) {
      setPostStatus("FAIL_DELETE");
    }
  };

  //REPEATED COMPONENTS
  const filtered_posts = posts.map((item, index) => {
    return (
      <Card
        key={index}
        style={styles.postCard}
        onClick={() => {
          setSelectedPost({ ...item, pictureIndex: item.pictureIndex });
          setShowPost(true);
        }}
        className="postCard"
      >
        <Card.Img
          variant="top"
          src={`/pictures/blog/default/test${item.pictureIndex}.svg`}
        />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="paste" />
            Make New Post
          </Header>
        </Divider>
      </>

      <PostForm onSubmit={onSubmit} postStatus={postStatus} />

      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="newspaper" />
            Posts
          </Header>
        </Divider>

        <Row className="mb-4">
          <Col></Col>
          <Col xs={12} sm={8}>
            {filtered_posts.reverse()}
          </Col>
          <Col></Col>
        </Row>
      </>

      <Modal show={showPost} onHide={handleClose}>
        <PostForm
          onSubmit={onSubmit}
          postStatus={postStatus}
          editPost={true}
          selectedPost={selectedPost}
          deletePost={deletePost}
          onHide={handleClose}
        />
      </Modal>
    </Container>
  );
}
