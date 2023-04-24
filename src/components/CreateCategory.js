import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import GetAllCategory from "./GetAllCategory";
import { Button, Col, Input, Row } from "reactstrap";

import UploadLogo from "../images/addAvatar.png";
import { Trash } from "react-feather";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  // console.log("image", image);

  const [categoryData, setCategoryData] = useState([]);

  const getAllCategoryFunc = async () => {
    await axios.get("https://react-node-multiple-image-upload-backendsite.vercel.app/getImages").then((res) => {
      if (res.data.success === 1) {
        setCategoryData(res.data.ImageData);
      } else {
        toast.error("Error in getting data");

        setCategoryData([]);
      }
    });
  };
  useEffect(() => {
    getAllCategoryFunc();
  }, []);

  function deleteFile(e) {
    const s = Object.values(image).filter((item, index) => index !== e);
    setImage(s);
  }

  const handleSubmit = () => {
    if (category === "") {
      toast.error("Category Name is empty.");
    } else {
      const formData = new FormData();
      formData.append("category", category);
      Array.from(image).forEach((item) => {
        formData.append("images", item);
      });
      const url = "https://react-node-multiple-image-upload-backendsite.vercel.app/createImages";
      axios
        .post(url, formData)
        .then((res) => {
          if (res.data.success === 1) {
            setImage("");
            setCategory("");
            toast(res.data.message);
            getAllCategoryFunc();
          } else {
            toast(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };
  return (
    <>
      <div className="mainDiv" style={{ padding: "50px" }}>
        {Array.from(image).map((item, index) => {
          return (
            <div
              className="imgDiv"
              style={{
                display: "inline-block",
                border: "1px solid red",
                padding: "14px",
                marginRight: "18px",
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
                src={item ? URL.createObjectURL(item) : null}
                alt="img"
              />
              <div
                className="deleteIcon"
                style={{ position: "absolute", top: "7px", right: "0" }}
              >
                <Trash
                  style={{ cursor: "pointer", margin: "0 10px" }}
                  size={25}
                  onClick={() => deleteFile(index)}
                />
              </div>
            </div>
          );
        })}

        <Row style={{ marginTop: "30px" }}>
          <Col md={1}>
            <Input
              style={{ display: "none" }}
              onChange={(e) => {
                setImage(e.target.files);
              }}
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

          <Col md={3} style={{ marginTop: "20px" }}>
            <Input
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="Enter Category Name"
              value={category}
            />
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Button color="primary" onClick={handleSubmit}>
              {" "}
              SUBMIT
            </Button>
          </Col>
        </Row>
      </div>

      <div>
        <GetAllCategory
          categoryData={categoryData}
          getAllCategoryFunc={getAllCategoryFunc}
        />
      </div>
    </>
  );
};

export default CreateCategory;
