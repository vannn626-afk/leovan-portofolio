import { LEOVAN_TECHNOLOGIES, type TechCategory, type TechItem } from '../data/technologies';
import { LEOVAN_PROJECTS, type ProjectItem } from '../data/projects';
import { LEOVAN_CONTACTS } from '../data/contacts';

/**
 * Filters the technology arsenal by category and optional search query.
 */
export function filterTechnologies(
  category: TechCategory,
  searchQuery = ''
): TechItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return LEOVAN_TECHNOLOGIES.filter((tech) => {
    const matchesCategory =
      category === 'ALL' || tech.categories.includes(category);
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    return (
      tech.name.toLowerCase().includes(normalizedQuery) ||
      tech.roleLabel.toLowerCase().includes(normalizedQuery) ||
      tech.description.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Counts technologies belonging to a given category.
 */
export function getCategoryCount(category: TechCategory): number {
  if (category === 'ALL') return LEOVAN_TECHNOLOGIES.length;
  return LEOVAN_TECHNOLOGIES.filter((t) => t.categories.includes(category)).length;
}

/**
 * Computes 3D perspective tilt angles (rotateX, rotateY) and glare coordinates
 * from pointer offsets normalized to [-0.5, 0.5].
 */
export function calculateCardTilt(
  normX: number,
  normY: number,
  maxDegrees = 10
): { rotateX: number; rotateY: number; glareX: number; glareY: number } {
  const clampedX = Math.max(-0.5, Math.min(0.5, normX));
  const clampedY = Math.max(-0.5, Math.min(0.5, normY));

  const rotateY = Number((clampedX * maxDegrees * 2).toFixed(2));
  const rotateX = Number((-clampedY * maxDegrees * 2).toFixed(2));
  const glareX = Math.round((clampedX + 0.5) * 100);
  const glareY = Math.round((clampedY + 0.5) * 100);

  return { rotateX, rotateY, glareX, glareY };
}

/**
 * Builds a properly encoded mailto URI for direct contact dispatch.
 */
export function buildMailtoUrl(params: {
  senderName?: string;
  subject?: string;
  message?: string;
}): string {
  const email = LEOVAN_CONTACTS.email;
  const cleanName = (params.senderName || '').trim();
  const cleanSubject = (params.subject || '').trim() || 'LEOVAN Portfolio Inquiry';
  const cleanMessage = (params.message || '').trim();

  const fullSubject = cleanName ? `[${cleanName}] ${cleanSubject}` : cleanSubject;
  const queryParts: string[] = [];

  queryParts.push(`subject=${encodeURIComponent(fullSubject)}`);
  if (cleanMessage) {
    queryParts.push(`body=${encodeURIComponent(cleanMessage)}`);
  }

  return `mailto:${email}?${queryParts.join('&')}`;
}

/**
 * Validates that all projects have valid external HTTPS URLs and non-empty features.
 */
export function validateProjectsArchive(): { valid: boolean; count: number; items: ProjectItem[] } {
  const valid = LEOVAN_PROJECTS.every(
    (p) =>
      p.url.startsWith('https://') &&
      p.name.startsWith('LEOVAN') &&
      p.features.length > 0
  );
  return {
    valid,
    count: LEOVAN_PROJECTS.length,
    items: LEOVAN_PROJECTS,
  };
}
