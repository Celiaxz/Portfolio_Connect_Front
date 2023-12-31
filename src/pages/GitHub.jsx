import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config/config.index";
import { Card, Button, Col, Row } from "antd";
import Pagination from "../components/Pagination";
import "./AllCardsProjectsListing.css";
function GitHub() {
  const { id } = useParams();
  const [projects, setProjects] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`${BASE_URL}/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        const github = await fetch(
          `https://api.github.com/users/${parsed.githubUsername}/repos`
        );
        if (github.status === 403)
          setErrorMessage("GitHub request limit reached");
        if (github.status === 404) setErrorMessage("GitHub Profile not found");
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, [id]);

  if (projects) {
    if (!projects.message) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const projectsToDisplay = projects?.slice(startIndex, endIndex) || [];

      const avatar = projects?.[0].owner.avatar_url;
      const isLoading = projects !== undefined;

      const totalPages = Math.ceil((projects?.length || 0) / itemsPerPage);

      const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
      };
      const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
      };

      return (
        <>
          <div className="github-container">
            <img className="github-avatar" src={avatar} alt="" />
            <Row gutter={16}>
              {projectsToDisplay.map((project) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
                  <Card
                    className="other-Users-card"
                    title={
                      <span className="other-Users-card-title">
                        {" "}
                        {project.name}
                      </span>
                    }
                  >
                    <p>Programming Language: {project.language}</p>
                    <Link
                      className="others-nav"
                      key={project.html_url}
                      to={project.html_url}
                    >
                      GitHub Repo Link
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
          </div>
        </>
      );
    } else {
      return <h2>{errorMessage}</h2>;
    }
  } else {
    return <h2>...Loading</h2>;
  }
}

export default GitHub;
