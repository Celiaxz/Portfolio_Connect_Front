import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function GitHub() {
  const { id } = useParams();
  const [projects, setProjects] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:5005/user/${id}`);
      if (response.status === 200) {
        const parsed = await response.json();
        const github = await fetch(
          `https://api.github.com/users/${parsed.githubUsername}/repos`
        );
        const parsedd = await github.json();
        setProjects(parsedd);
      }
    }
    fetchUser();
  }, []);

  const avatar = projects?.[0].owner.avatar_url;
  const isLoading = projects !== undefined;
  return (
    <>
      {isLoading ? (
        <div>
          <img src={avatar} alt="" />
          {projects.map((project) => (
            <div key={project.id} className="projects-list">
              <p>{project.name}</p>
              <p>{project.language}</p>
              <Link key={project.html_url} to={project.html_url}>
                GitHub Project
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default GitHub;