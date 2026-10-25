export interface Project {
  number: string;
  category: string;
  name: string;
  description: string;
  stack: string[];
  metric: string;
  flow: { name: string; role: string; caption: string }[];
  links: string[];
  githubUrl: string;
  images?: [string, string, string];
  // TODO: fill these only with verified case-study facts and links.
  problem?: string;
  role?: string;
  solution?: string;
  results?: string[];
  readmeUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  screenshots?: string[];
  architectureImage?: string;
}

export const projects: Project[] = [
  {
    number: "01", category: "Data Engineering, 10/2026", name: "Airflow + dbt + Snowflake Pipeline",
    description: "Automated ELT pipeline transforming commercial data into analytical tables in Snowflake, with tested dbt layers and daily orchestration.",
    stack: ["Python", "Apache Airflow", "dbt", "Snowflake", "SQL", "Docker"], metric: "Daily automated ELT",
    flow: [
      { name: "Commercial data", role: "Raw source", caption: "Commercial data is the raw input of the ELT pipeline." },
      { name: "Apache Airflow", role: "Orchestration", caption: "Airflow runs the pipeline every day; Astronomer Cosmos turns the dbt project into Airflow tasks." },
      { name: "dbt", role: "Transformations + tests", caption: "dbt structures the data in staging, intermediate and marts models and runs data quality tests." },
      { name: "Snowflake", role: "Analytical tables", caption: "The marts end up as analytical tables in Snowflake, ready for analysis." },
    ], links: ["daily trigger", "tested models", "analytical tables"],
    // TODO: replace with this project's repository URL when it is published.
    githubUrl: "",
    problem: '', role: '', solution: '', results: [], readmeUrl: '', demoUrl: '', videoUrl: '', screenshots: [], architectureImage: '',
  },
  {
    number: "02", category: "Business Intelligence, 04/2026", name: "SNCF Decision-Support BI",
    description: "Talend ETL pipeline and SQL Server star schema for six million records, with Power BI reports for decision-making.",
    stack: ["Talend", "SQL Server", "Power BI"], metric: "6M records",
    flow: [
      { name: "SNCF data", role: "Source data", caption: "SNCF data enters the Talend ETL pipeline." },
      { name: "Talend", role: "ETL pipeline", caption: "Talend extracts and transforms the SNCF data." },
      { name: "SQL Server", role: "Star schema, 6M records", caption: "SQL Server loads the transformed data into a star schema." },
      { name: "Power BI", role: "Decision-support reports", caption: "Power BI turns the SQL Server data into decision-support reports." },
    ], links: ["extract & transform", "load star schema", "reports"],
    // TODO: replace with this project's repository URL when it is published.
    githubUrl: "",
    problem: '', role: '', solution: '', results: [], readmeUrl: '', demoUrl: '', videoUrl: '', screenshots: [], architectureImage: '',
  },
  {
    number: "03", category: "Internship PFA, Ministry of Territorial Planning, 07-09/2026", name: "Credit Data ETL & Data Warehouse",
    description: "PySpark ETL pipeline cleaning and transforming credit data into a SQL Server warehouse with automated dashboards and workflows.",
    stack: ["Python", "PySpark", "Airflow", "Docker", "SQL Server", "Power BI"], metric: "ETL + Data Warehouse",
    flow: [
      { name: "Credit data", role: "Raw files", caption: "Credit data provides the raw files for the ETL pipeline." },
      { name: "PySpark", role: "Clean & transform", caption: "PySpark cleans and transforms the credit data." },
      { name: "SQL Server", role: "Data warehouse", caption: "The clean data is loaded into a SQL Server data warehouse." },
      { name: "Power BI", role: "Dashboards", caption: "Power BI presents the data as dashboards with key indicators." },
    ], links: ["raw files", "clean data", "key indicators"],
    // TODO: replace with this project's repository URL when it is published.
    githubUrl: "",
    problem: '', role: '', solution: '', results: [], readmeUrl: '', demoUrl: '', videoUrl: '', screenshots: [], architectureImage: '',
  },
  {
    number: "04", category: "AI / Computer Vision, team project, 02/2026", name: "VisionGuard",
    description: "Real-time intelligent security system using computer vision and facial recognition, with an ASP.NET Core API and React dashboard.",
    stack: ["Python", "OpenCV", "T-SQL", ".NET / ASP.NET Core", "React"], metric: "Real-time facial recognition",
    flow: [
      { name: "Camera", role: "Video source", caption: "The camera provides video frames for the security system." },
      { name: "OpenCV", role: "Facial recognition", caption: "OpenCV processes the video frames for facial recognition." },
      { name: "ASP.NET Core API", role: "Backend + T-SQL database", caption: "The ASP.NET Core API serves the recognition results through the backend and database." },
      { name: "React", role: "Real-time monitoring dashboard", caption: "React displays the live data in a real-time monitoring dashboard." },
    ], links: ["video frames", "recognition results", "live data"],
    // TODO: replace with this project's repository URL when it is published.
    githubUrl: "",
    problem: '', role: '', solution: '', results: [], readmeUrl: '', demoUrl: '', videoUrl: '', screenshots: [], architectureImage: '',
  },
  {
    number: "05", category: "Web Development, 12/2025", name: "Full-Stack E-commerce Platform",
    description: "E-commerce application with secure JWT authentication, a Spring Boot REST API, MongoDB, React, and Tailwind CSS.",
    stack: ["React", "Spring Boot", "MongoDB", "JWT", "Tailwind CSS"], metric: "JWT-secured REST API",
    flow: [
      { name: "React + Tailwind", role: "User interface", caption: "React and Tailwind provide the e-commerce user interface." },
      { name: "Spring Boot", role: "REST API + JWT authentication", caption: "Spring Boot handles REST API requests and JWT authentication." },
      { name: "MongoDB", role: "Database", caption: "MongoDB stores the e-commerce application data." },
    ], links: ["HTTP requests", "queries"],
    // TODO: replace with this project's repository URL when it is published.
    githubUrl: "",
    problem: '', role: '', solution: '', results: [], readmeUrl: '', demoUrl: '', videoUrl: '', screenshots: [], architectureImage: '',
  },
];
