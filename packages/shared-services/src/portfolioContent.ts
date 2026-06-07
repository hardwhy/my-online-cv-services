import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Achievement,
  BlogPost,
  Certification,
  CVData,
  Experience,
  Profile,
  Project,
  Skill,
  SocialLink,
  Stat,
  Testimonial,
} from '@web-cv-services/shared-types';

type PortfolioVisibility = 'public' | 'admin';

type PortfolioContentFallbacks = {
  profile?: Profile;
  socials?: SocialLink[];
  skills?: Skill[];
  experiences?: Experience[];
  projects?: Project[];
  certifications?: Certification[];
  achievements?: Achievement[];
  testimonials?: Testimonial[];
  blogPosts?: BlogPost[];
};

type PortfolioContentOptions = {
  visibility?: PortfolioVisibility;
  fallbacks?: PortfolioContentFallbacks;
};

type ProfileRow = {
  full_name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string | null;
  stats: unknown;
  strengths: string[] | null;
  interests: string[] | null;
};

type SocialLinkRow = {
  label: string;
  href: string;
  icon: string | null;
  show_in_web: boolean;
  is_published: boolean;
};

type SkillRow = {
  name: string;
  category: Skill['category'];
  proficiency: number;
  description: string | null;
};

type ExperienceRow = {
  company: string;
  position: string;
  duration: string;
  location: string;
  summary: string;
  responsibilities: string[] | null;
  achievements: string[] | null;
  technologies: string[] | null;
};

type ProjectRow = {
  slug: string;
  title: string;
  category: Project['category'];
  description: string;
  impact: string;
  technologies: string[] | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
};

type CertificationRow = {
  name: string;
  issuer: string;
  issue_date: string;
  credential_url: string | null;
  download_url: string | null;
  image_url: string | null;
};

type AchievementRow = {
  title: string;
  description: string;
  date: string;
};

type TestimonialRow = {
  quote: string;
  author: string;
  role: string;
};

type BlogPostRow = {
  slug: string;
  title: string;
  date: string;
  tags: string[] | null;
  excerpt: string;
  content: string;
};

const readArray = <T>(value: unknown, fallback: T[] = []): T[] => (Array.isArray(value) ? (value as T[]) : fallback);
const optionalUrl = (value: string | null | undefined) => value?.trim() || undefined;
const linkUrl = (value: string | null | undefined) => value?.trim() || '#';

const shouldFilterPublished = (visibility: PortfolioVisibility) => visibility === 'public';

const withPublishedFilter = <T extends { eq: (column: string, value: boolean) => T }>(query: T, visibility: PortfolioVisibility) =>
  shouldFilterPublished(visibility) ? query.eq('is_published', true) : query;

export const emptyPortfolioContent: CVData = {
  profile: {
    fullName: '',
    title: '',
    summary: '',
    location: '',
    email: '',
    stats: [],
    strengths: [],
    interests: [],
  },
  socials: [],
  skills: [],
  experiences: [],
  projects: [],
  certifications: [],
  achievements: [],
};

export const mapProfileRow = (row: ProfileRow, fallback?: Profile): Profile => ({
  fullName: row.full_name,
  title: row.title,
  summary: row.summary,
  location: row.location,
  email: row.email,
  phone: row.phone ?? undefined,
  stats: readArray<Stat>(row.stats, fallback?.stats),
  strengths: readArray<string>(row.strengths, fallback?.strengths),
  interests: readArray<string>(row.interests, fallback?.interests),
});

export const mapSocialLinkRow = (row: SocialLinkRow): SocialLink => ({
  label: row.label,
  href: row.href,
  icon: row.icon ?? undefined,
  showInWeb: row.show_in_web,
  isPublished: row.is_published,
});

export const mapSkillRow = (row: SkillRow): Skill => ({
  name: row.name,
  category: row.category,
  proficiency: row.proficiency,
  description: row.description ?? undefined,
});

export const mapExperienceRow = (row: ExperienceRow): Experience => ({
  company: row.company,
  position: row.position,
  duration: row.duration,
  location: row.location,
  summary: row.summary,
  responsibilities: readArray<string>(row.responsibilities),
  achievements: readArray<string>(row.achievements),
  technologies: readArray<string>(row.technologies),
});

export const mapProjectRow = (row: ProjectRow): Project => ({
  slug: row.slug,
  title: row.title,
  category: row.category,
  description: row.description,
  impact: row.impact,
  technologies: readArray<string>(row.technologies),
  githubUrl: linkUrl(row.github_url),
  liveUrl: linkUrl(row.live_url),
  featured: row.featured,
});

export const mapCertificationRow = (row: CertificationRow): Certification => ({
  name: row.name,
  issuer: row.issuer,
  issueDate: row.issue_date,
  credentialUrl: linkUrl(row.credential_url),
  downloadUrl: optionalUrl(row.download_url),
  imageUrl: optionalUrl(row.image_url),
});

export const mapBlogPostRow = (row: BlogPostRow): BlogPost => ({
  slug: row.slug,
  title: row.title,
  date: row.date,
  tags: readArray<string>(row.tags),
  excerpt: row.excerpt,
  content: row.content,
});

export async function getPortfolioProfile(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Profile> {
  const fallback = options.fallbacks?.profile;
  if (!client) {
    if (fallback) return fallback;
    throw new Error('Supabase is not configured.');
  }

  const query = client.from('site_profile').select('full_name,title,summary,location,email,phone,stats,strengths,interests').limit(1);
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public').maybeSingle<ProfileRow>();

  if (error) throw error;
  if (!data && fallback) return fallback;
  if (!data) throw new Error('No CV profile content is available.');
  return mapProfileRow(data, fallback);
}

export async function getPortfolioSocialLinks(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<SocialLink[]> {
  if (!client) return options.fallbacks?.socials ?? [];

  const query = client.from('social_links').select('label,href,icon,show_in_web,is_published').order('label', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');

  if (error) throw error;
  return (data as SocialLinkRow[]).map(mapSocialLinkRow);
}

export async function getPortfolioSkills(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Skill[]> {
  if (!client) return options.fallbacks?.skills ?? [];

  const query = client.from('skills').select('name,category,proficiency,description').order('sort_order', { ascending: true }).order('name', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as SkillRow[]).map(mapSkillRow);
}

export async function getPortfolioExperiences(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Experience[]> {
  if (!client) return options.fallbacks?.experiences ?? [];

  const query = client
    .from('experiences')
    .select('company,position,duration,location,summary,responsibilities,achievements,technologies')
    .order('sort_order', { ascending: true })
    .order('company', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as ExperienceRow[]).map(mapExperienceRow);
}

export async function getPortfolioProjects(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Project[]> {
  if (!client) return options.fallbacks?.projects ?? [];

  const query = client
    .from('projects')
    .select('slug,title,category,description,impact,technologies,github_url,live_url,featured')
    .order('sort_order', { ascending: true })
    .order('title', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as ProjectRow[]).map(mapProjectRow);
}

export async function getPortfolioCertifications(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Certification[]> {
  if (!client) return options.fallbacks?.certifications ?? [];

  const query = client
    .from('certifications')
    .select('name,issuer,issue_date,credential_url,download_url,image_url')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as CertificationRow[]).map(mapCertificationRow);
}

export async function getPortfolioAchievements(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Achievement[]> {
  if (!client) return options.fallbacks?.achievements ?? [];

  const query = client.from('achievements').select('title,description,date').order('sort_order', { ascending: true }).order('title', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as AchievementRow[]).map((row) => ({ ...row }));
}

export async function getPortfolioTestimonials(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<Testimonial[]> {
  if (!client) return options.fallbacks?.testimonials ?? [];

  const query = client.from('testimonials').select('quote,author,role').order('sort_order', { ascending: true }).order('author', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as TestimonialRow[]).map((row) => ({ ...row }));
}

export async function getPortfolioBlogPosts(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<BlogPost[]> {
  if (!client) return options.fallbacks?.blogPosts ?? [];

  const query = client.from('blog_posts').select('slug,title,date,tags,excerpt,content').order('sort_order', { ascending: true }).order('title', { ascending: true });
  const { data, error } = await withPublishedFilter(query, options.visibility ?? 'public');
  if (error) throw error;
  return (data as BlogPostRow[]).map(mapBlogPostRow);
}

export async function getPortfolioCVData(client: SupabaseClient | null, options: PortfolioContentOptions = {}): Promise<CVData> {
  const [profile, socials, skills, experiences, projects, certifications, achievements] = await Promise.all([
    getPortfolioProfile(client, options),
    getPortfolioSocialLinks(client, options),
    getPortfolioSkills(client, options),
    getPortfolioExperiences(client, options),
    getPortfolioProjects(client, options),
    getPortfolioCertifications(client, options),
    getPortfolioAchievements(client, options),
  ]);

  return {
    profile,
    socials,
    skills,
    experiences,
    projects,
    certifications,
    achievements,
  };
}
