import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Row, Col } from "reactstrap";

const GetAllCategory = ({ categoryData, getAllCategoryFunc }) => {
  return (
    <div>
      <Row style={{ padding: "25px", marginTop: "10px" }}>
        <h3 style={{ marginLeft: "15px" }}>Category List</h3>

        {categoryData ? (
          <>
            {categoryData &&
              categoryData.map((data) => (
                <>
                  <Col
                    key={data._id}
                    md={4}
                    style={{ padding: "25px", marginTop: "10px" }}
                  >
                    <CategoryCard
                      data={data}
                      getAllCategoryFunc={getAllCategoryFunc}
                    />
                  </Col>
                </>
              ))}
          </>
        ) : (
          <h5 style={{ padding: "30px" }}>
            Nothing to Show, Please create new Category.
          </h5>
        )}
      </Row>
    </div>
  );
};

export default GetAllCategory;
