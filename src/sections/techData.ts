export type Tech = {
  name: string;
  slug: string | null;
  devicon: string | null;
  iconify: string | null;
  color: string;
  role: string;
};

export const techs: Tech[] = [
  { name: 'Python', slug: 'python', devicon: null, iconify: null, color: '3776AB', role: 'Core language' },
  { name: 'PySpark', slug: 'apachespark', devicon: 'apachespark/apachespark-original', iconify: null, color: 'E25A1C', role: 'Large-scale ETL' },
  { name: 'Apache Airflow', slug: 'apacheairflow', devicon: null, iconify: null, color: '017CEE', role: 'Orchestration' },
  { name: 'dbt', slug: null, devicon: null, iconify: 'logos:dbt-icon', color: 'FF694B', role: 'Transformations & tests' },
  { name: 'Snowflake', slug: 'snowflake', devicon: null, iconify: null, color: '29B5E8', role: 'Cloud data warehouse' },
  { name: 'SQL Server', slug: null, devicon: 'microsoftsqlserver/microsoftsqlserver-plain', iconify: null, color: 'CC2927', role: 'Data warehouse' },
  { name: 'Power BI', slug: null, devicon: null, iconify: 'logos:microsoft-power-bi', color: 'F2C811', role: 'Dashboards' },
  { name: 'Talend', slug: 'talend', devicon: null, iconify: null, color: 'FF6D70', role: 'ETL pipelines' },
  { name: 'Docker', slug: 'docker', devicon: 'docker/docker-original', iconify: null, color: '2496ED', role: 'Containerization' },
  { name: 'PostgreSQL', slug: 'postgresql', devicon: 'postgresql/postgresql-original', iconify: null, color: '4169E1', role: 'Relational database' },
  { name: 'MongoDB', slug: 'mongodb', devicon: 'mongodb/mongodb-original', iconify: null, color: '47A248', role: 'NoSQL database' },
  { name: 'React', slug: 'react', devicon: 'react/react-original', iconify: null, color: '61DAFB', role: 'Front-end' },
  { name: 'Spring Boot', slug: 'springboot', devicon: 'spring/spring-original', iconify: null, color: '6DB33F', role: 'REST APIs' },
  { name: 'Flask', slug: 'flask', devicon: 'flask/flask-original', iconify: null, color: 'D7E2EA', role: 'Python API' },
  { name: 'ASP.NET Core', slug: 'dotnet', devicon: 'dotnetcore/dotnetcore-original', iconify: null, color: '512BD4', role: 'Backend API' },
  { name: 'OpenCV', slug: 'opencv', devicon: 'opencv/opencv-original', iconify: null, color: '5C3EE8', role: 'Computer vision' },
  { name: 'Java', slug: 'openjdk', devicon: 'java/java-original', iconify: null, color: 'ED8B00', role: 'Backend & big data' },
  { name: 'C#', slug: null, devicon: 'csharp/csharp-original', iconify: null, color: '9B4F96', role: 'Backend language' },
  { name: 'Cassandra', slug: 'apachecassandra', devicon: 'cassandra/cassandra-original', iconify: null, color: '1287B1', role: 'Distributed database' },
  { name: 'Neo4j', slug: 'neo4j', devicon: 'neo4j/neo4j-original', iconify: null, color: '4581C3', role: 'Graph database' },
  { name: 'GitHub', slug: 'github', devicon: 'github/github-original', iconify: null, color: 'D7E2EA', role: 'Version control' },
];
