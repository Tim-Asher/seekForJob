// Mine 9.8
import React from "react";
import JobSearchBar from "../components/layout/SearchBar";
import JobCards from "../components/jobs/JobCards";
import Statistics from "../components/layout/Statistics";

const Home = () => {
  return (
    <div>
      <JobSearchBar />
      <JobCards isHome={true} />
      <Statistics />
    </div>
  );
};

export default Home;
