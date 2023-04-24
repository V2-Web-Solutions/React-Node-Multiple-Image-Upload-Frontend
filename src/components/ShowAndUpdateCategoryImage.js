import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Crosshair, Trash, ArrowLeft, Edit, Download } from "react-feather";

import { UncontrolledTooltip, Input, Button, Row, Col } from "reactstrap";

import UploadLogo from "../images/addAvatar.png";
import { toast } from "react-toastify";

const ShowAndUpdateCategoryImage = () => {
  const { categoryId } = useParams();

  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId === "" || categoryId === null || categoryId === undefined) {
      navigate("/");
    }

    axios
      .post("https://react-node-multiple-image-upload-backendsite.vercel.app/getCategoryId", {
        categoryId: categoryId,
      })
      .then((res) => {
        if (res.data.success === 1) {
          setImage(res.data.ImageData.images);
          setCategory(res.data.ImageData.category);
        } else {
          navigate("/");
        }
      });
  }, [categoryId]);

  function deleteFile(e) {
    const s = image.filter((item, index) => index !== e);

    setImage(s);
  }

  const uploadFileFunc = (e) => {
    let data = Object.values(e.target.files);

    setImage(image.concat(data));
  };

  const handleSubmit = () => {
    if (category === "") {
      toast.error("Category nameis empty.");
    } else {
      let formData = new FormData();
      formData.append("categoryName", category);
      formData.append("categoryId", categoryId);
      formData.append("imgArray", JSON.stringify(image));

      Array.from(image).forEach((item) => {
        formData.append("Images", item);
      });
      // const url =
      // 	process.env.REACT_APP_BACKEND_URL + '/api/updateCategory';
      // axios.post(url, formData)
      // 	.then((res) => {
      // 		if (res.data.success === 1) {
      // 			toast.success('Category updated successfully.');
      // 			navigate('/');
      // 		} else {
      // 			toast.error('Error in  updating category');
      // 		}
      // 	})
      // 	.catch((err) => {
      // 		toast.error('Error in  updating category');
      // 	});
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="mainDiv" style={{ padding: "50px" }}>
        <Button color="primary" onClick={handleBackClick}>
          <ArrowLeft size={20} style={{ marginRight: "8px" }} />
          Back
        </Button>
        <br />
        <br />
        <br />

        {image.map((item, index) => {
          return (
            <div
              className="imgDiv"
              style={{
                display: "inline-block",
                border: "1px solid red",
                padding: "14px",
                marginRight: "18px",
                marginBottom: "15px",
                borderRadius: "0 15px 0 15px",
                position: "relative",
              }}
            >
              <img
                className="imageClass"
                style={{
                  padding: "3px",
                  borderRadius: "50%",
                  border: "1px solid green",
                  // marginRight: "0 10px",
                }}
                width={140}
                height={140}
                src={
                  item
                    ? item.filename
                      ? `https://react-node-multiple-image-upload-backendsite.vercel.app/${item.filename}`
                      : URL.createObjectURL(item)
                    : null
                }
                alt="img"
              />
              <div
                className="deleteIcon"
                style={{
                  position: "absolute",
                  top: "7px",
                  right: "0",
                }}
              >
                <Trash
                  style={{
                    cursor: "pointer",
                    margin: "0 10px",
                  }}
                  size={25}
                  onClick={() => deleteFile(index)}
                />
              </div>
            </div>
          );
        })}
        <br />
        <br />
        {/* <Row style={{ marginTop: "30px" }}>
          <Col md={1}>
            <input
              style={{ display: "none" }}
              onChange={uploadFileFunc}
              multiple
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              id="uploadImage"
            />

            <label htmlFor="uploadImage">
              <img
                id="uploadFiles"
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  margin: "0 35px",
                }}
                height={70}
                width={70}
                src={UploadLogo}
                alt="UploadLogo"
              />
            </label>
          </Col>

          <Col md={4} style={{ marginTop: "10px" }}>
            <Input
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              value={category}
            />
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <Button primary onClick={handleSubmit}>
              {" "}
              UPDATE
            </Button>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default ShowAndUpdateCategoryImage;
