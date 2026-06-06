import React, { type ReactNode } from 'react';
import type { CVData, CVExportOptions, CVTemplateMeta, SkillCategory } from '@web-cv-services/shared-types';

type CVDocumentProps = {
  data: CVData;
  options?: Partial<CVExportOptions>;
};

const skillCategories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Tools'];

const socialHref = (href: string) => href.replace(/^https?:\/\//, '').replace(/\/$/, '');

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cv-section" aria-labelledby={`cv-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <h2 id={`cv-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="cv-section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ModernAtsCV({ data }: CVDocumentProps) {
  const { profile, experiences, skills, projects, certifications, achievements } = data;
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const visibleProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);
  const hasSkills = skills.length > 0;

  return (
    <article className="cv-document" aria-label={`${profile.fullName} CV`}>
      <header className="cv-header">
        <h1 className="cv-name">{profile.fullName}</h1>
        <p className="cv-title">{profile.title}</p>
        <address className="cv-contact">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
          {profile.phone ? <span>{profile.phone}</span> : null}
          {profile.socials.map((social) => (
            <a key={social.href} href={social.href}>
              {social.label}: {socialHref(social.href)}
            </a>
          ))}
        </address>
      </header>

      <main className="cv-main">
        <Section title="Summary">
          <p className="cv-summary">{profile.summary}</p>
        </Section>

        {experiences.length > 0 ? (
          <Section title="Experience">
            {experiences.map((experience) => (
              <article className="cv-entry" key={`${experience.company}-${experience.position}`}>
                <div className="cv-entry-heading">
                  <h3 className="cv-entry-title">{experience.position}</h3>
                  <p className="cv-entry-meta">{experience.duration}</p>
                </div>
                <p className="cv-entry-subtitle">
                  {experience.company} | {experience.location}
                </p>
                <p className="cv-entry-body">{experience.summary}</p>
                <BulletList items={[...experience.achievements, ...experience.responsibilities].slice(0, 5)} />
                {experience.technologies.length > 0 ? (
                  <div className="cv-tags" aria-label="Technologies">
                    {experience.technologies.map((technology) => (
                      <span className="cv-tag" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </Section>
        ) : null}

        {hasSkills ? (
          <Section title="Skills">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter((skill) => skill.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div className="cv-skill-group" key={category}>
                  <h3 className="cv-skill-category">{category}</h3>
                  <div className="cv-skill-grid">
                    {categorySkills.map((skill) => (
                      <span className="cv-tag" key={`${category}-${skill.name}`}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </Section>
        ) : null}

        <div className="cv-two-column">
          {certifications.length > 0 ? (
            <Section title="Certifications">
              {certifications.map((certification) => (
                <article className="cv-entry" key={`${certification.name}-${certification.issuer}`}>
                  <div className="cv-entry-heading">
                    <h3 className="cv-entry-title">{certification.name}</h3>
                    <p className="cv-entry-meta">{certification.issueDate}</p>
                  </div>
                  <p className="cv-entry-subtitle">{certification.issuer}</p>
                </article>
              ))}
            </Section>
          ) : null}

          {achievements.length > 0 ? (
            <Section title="Achievements">
              {achievements.slice(0, 5).map((achievement) => (
                <article className="cv-entry" key={achievement.title}>
                  <div className="cv-entry-heading">
                    <h3 className="cv-entry-title">{achievement.title}</h3>
                    <p className="cv-entry-meta">{achievement.date}</p>
                  </div>
                  <p className="cv-entry-body">{achievement.description}</p>
                </article>
              ))}
            </Section>
          ) : null}
        </div>

        {visibleProjects.length > 0 ? (
          <Section title="Projects">
            {visibleProjects.map((project) => (
              <article className="cv-entry" key={project.slug}>
                <div className="cv-entry-heading">
                  <h3 className="cv-entry-title">{project.title}</h3>
                  <p className="cv-entry-meta">{project.category}</p>
                </div>
                <p className="cv-entry-body">{project.impact || project.description}</p>
                {project.technologies.length > 0 ? (
                  <div className="cv-tags" aria-label="Project technologies">
                    {project.technologies.map((technology) => (
                      <span className="cv-tag" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </Section>
        ) : null}
      </main>
    </article>
  );
}

export const cvTemplateRegistry: CVTemplateMeta[] = [
  {
    id: 'modern-ats',
    label: 'Modern ATS-Friendly',
    description: 'Clean recruiter-friendly layout with semantic headings, selectable text, and restrained visual hierarchy.',
    supportedPaperSizes: ['A4', 'Letter'],
    isAvailable: true,
  },
  {
    id: 'executive-professional',
    label: 'Executive Professional',
    description: 'Future template for leadership and principal-level applications.',
    supportedPaperSizes: ['A4', 'Letter'],
    isAvailable: false,
  },
  {
    id: 'minimal-clean',
    label: 'Minimal Clean',
    description: 'Future template with an ultra-light visual style.',
    supportedPaperSizes: ['A4', 'Letter'],
    isAvailable: false,
  },
  {
    id: 'creative-portfolio',
    label: 'Creative Portfolio',
    description: 'Future template for portfolio-forward applications.',
    supportedPaperSizes: ['A4', 'Letter'],
    isAvailable: false,
  },
];

export function CVDocument({ data, options }: CVDocumentProps) {
  switch (options?.templateId ?? 'modern-ats') {
    case 'modern-ats':
    default:
      return <ModernAtsCV data={data} options={options} />;
  }
}
