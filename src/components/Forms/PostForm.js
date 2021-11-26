import React, { useState } from "react";

//bootstrap
import { Form, Button, Row, Col, Alert, Image } from "react-bootstrap";

export default function PostForm({
  onSubmit,
  postStatus,
  editPost,
  deletePost,
  selectedPost,
}) {
  const styles = {
    button: {
      width: "100%",
    },
    faIcon: {
      marginRight: "1em",
    },
    editStyle: {
      padding: "2em",
    },
  };

  //STATE
  const [postData, setPostData] = useState(null);

  //EVENT HANDLERS

  //update post data
  const postDataUpdate = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setPostData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  //submit or edit post
  const submitPost = (event) => {
    event.preventDefault();
    onSubmit(postData, editPost);
  };

  //delete post
  const deleteThisPost = () => {
    deletePost(selectedPost.postId);
  };

  var alert_msg = null;

  if (postStatus) {
    alert_msg = (
      <>
        {postStatus === "SUCCESS_POST" ? (
          <Alert variant="success">Post Submitted</Alert>
        ) : postStatus === "SUCCESS_EDIT" ? (
          <Alert variant="success">Post Edited</Alert>
        ) : postStatus.includes("SUCCESS_DELETE") ? (
          <Alert variant="success">Post Deleted</Alert>
        ) : postStatus === "PENDING" ? (
          <Alert variant="warning">Submitting Post...</Alert>
        ) : postStatus === "FAIL_DELETE" ? (
          <Alert variant="danger">Post Deletion Failed!</Alert>
        ) : postStatus === "FAIL" ? (
          <Alert variant="danger">{`Post ${
            editPost ? "update" : "addition"
          } failed!`}</Alert>
        ) : null}
      </>
    );
  }

  return (
    <Form style={editPost ? styles.editStyle : null}>
      {alert_msg}
      {editPost ? (
        <>
          <h1 className="text-center">Edit Post</h1>
          <Image
            fluid
            variant="top"
            src={`/pictures/blog/default/test${selectedPost.pictureIndex}.svg`}
          />
        </>
      ) : null}

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Enter Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Blog Title"
          name="title"
          value={postData ? postData.title : " "}
          onChange={postDataUpdate}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          as="textarea"
          name="description"
          value={postData ? postData.description : " "}
          onChange={postDataUpdate}
        />
      </Form.Group>

      <Row className="mb-4">
        {/* <Col>
            <Button className="mt-3 screenButton" size="lg">
              <FontAwesomeIcon icon={faCamera} style={styles.faIcon} />
              Upload Photo
            </Button>
          </Col> */}
        <Col className={editPost ? "col-sm-12" : "col-md-2"}>
          <Button
            variant="primary"
            type="submit"
            className="mt-3 screenButton"
            size="lg"
            style={styles.button}
            onClick={submitPost}
          >
            Submit
          </Button>
          {editPost ? (
            <Button
              variant="danger"
              className="mt-3 screenButton"
              size="lg"
              style={styles.button}
              onClick={deleteThisPost}
            >
              Delete Post
            </Button>
          ) : null}
        </Col>
      </Row>
    </Form>
  );
}
