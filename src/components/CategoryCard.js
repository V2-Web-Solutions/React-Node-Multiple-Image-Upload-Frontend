import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
import { Trash } from "react-feather";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryCard = ({ data, getAllCategoryFunc }) => {
  console.log("category:", data.category);
  const onDeleteFunc = async (id) => {
    if (id === "" || id === null || id === undefined) {
      toast.error("Cannot delete");
    } else {
      await axios
        .post("http://localhost:8000/deleteCategoryId", {
          categoryId: id,
        })
        .then((res) => {
          if (res.data.success === 1) {
            toast.success("Category deleted successfully.");

            getAllCategoryFunc();
          } else {
            toast.success("Error in deleting category.");
          }
        });
    }
  };
  return (
    <div>
      <Card body>
        <Row>
          <Col md={10}>
            <Link
              to={`/category/${data._id}`}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <h5>{data.category}</h5>
            </Link>
          </Col>

          <Col md={2} style={{ textAlign: "center" }}>
            <Trash size={25} onClick={() => onDeleteFunc(data._id)} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CategoryCard;
