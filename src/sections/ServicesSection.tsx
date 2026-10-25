import FadeIn from '../components/FadeIn';
import { useT } from '../i18n';

const services = [
  ['Data Pipelines (ETL/ELT)', 'Design and automation of reliable pipelines that extract, clean, and transform large datasets using PySpark, Talend, dbt, and Apache Airflow, ready for analysis.'],
  ['Data Warehousing', 'Modeling and building data warehouses and star schemas on SQL Server and Snowflake that make business data organized, trustworthy, and easy to query.'],
  ['BI & Dashboards', 'Clear, decision-ready Power BI dashboards and reports that turn raw indicators into insights teams can act on.'],
  ['LLM, RAG & AI Agents', 'Design and development of custom AI agents powered by large language models and retrieval-augmented generation (RAG), connected to your documents and data to deliver accurate, source-grounded answers and automate real workflows.'],
  ['Full-Stack Development', 'Secure, modern web applications with React, Spring Boot, including REST APIs, authentication, and database design.'],
];

export default function ServicesSection() {
  const { dictionary } = useT();
  return (
    <section id="price" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#FFFFFF' }}>
      <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}>
         {dictionary.services.heading}
      </h2>
      <div className="max-w-5xl mx-auto">
         {dictionary.services.items.map(({ name, description: desc }, i) => (
          <FadeIn key={name} delay={i * 0.1}>
            <div className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
                 style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)', color: '#0C0C0C' }}>
              <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0C0C0C' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{name}</h3>
                <p className="font-light leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}>{desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
