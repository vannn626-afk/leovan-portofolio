import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterTechnologies,
  getCategoryCount,
  calculateCardTilt,
  buildMailtoUrl,
  validateProjectsArchive,
} from './portfolio-logic';
import { LEOVAN_PROFILE } from '../data/profile';
import { LEOVAN_CONTACTS } from '../data/contacts';

test('technology category counts match exact specification', () => {
  assert.equal(getCategoryCount('PROGRAMMING LANGUAGES'), 16);
  assert.equal(getCategoryCount('FRONTEND'), 6);
  assert.equal(getCategoryCount('BACKEND'), 7);
  assert.equal(getCategoryCount('DATABASE'), 6);
  assert.equal(getCategoryCount('TOOLS & PLATFORMS'), 8);
  assert.equal(getCategoryCount('ALL'), 41);
});

test('filterTechnologies filters by category and search term accurately', () => {
  const backendTechs = filterTechnologies('BACKEND');
  assert.equal(backendTechs.length, 7);
  assert.ok(backendTechs.some((t) => t.name === 'FastAPI'));
  assert.ok(backendTechs.some((t) => t.name === 'Laravel'));
  assert.ok(backendTechs.some((t) => t.name === 'Python'));
  assert.ok(backendTechs.some((t) => t.name === 'PHP'));

  const searchResult = filterTechnologies('ALL', 'tailwind css');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'tailwindcss');

  const nextRelated = filterTechnologies('ALL', 'next.js');
  assert.equal(nextRelated.length, 2);
  assert.equal(nextRelated[0].id, 'nextjs');
});

test('calculateCardTilt clamps and computes accurate 3D rotation degrees', () => {
  const center = calculateCardTilt(0, 0, 12);
  assert.equal(center.rotateX, 0);
  assert.equal(center.rotateY, 0);
  assert.equal(center.glareX, 50);
  assert.equal(center.glareY, 50);

  const extreme = calculateCardTilt(1, -1, 10);
  assert.equal(extreme.rotateY, 10);
  assert.equal(extreme.rotateX, 10);
  assert.equal(extreme.glareX, 100);
  assert.equal(extreme.glareY, 0);
});

test('buildMailtoUrl formats recipient email and query parameters safely', () => {
  const url = buildMailtoUrl({
    senderName: 'Raka',
    subject: 'Web App Idea',
    message: 'Halo LEOVAN, mari kolaborasi!',
  });
  assert.ok(url.startsWith('mailto:vannn626@gmail.com?'));
  assert.ok(url.includes(encodeURIComponent('[Raka] Web App Idea')));
  assert.ok(url.includes(encodeURIComponent('Halo LEOVAN, mari kolaborasi!')));
});

test('validateProjectsArchive and profile/contact invariants hold', () => {
  const archive = validateProjectsArchive();
  assert.equal(archive.valid, true);
  assert.equal(archive.count, 2);
  assert.equal(archive.items[0].url, 'https://leovan.my.id');
  assert.equal(archive.items[1].url, 'https://leovandyz.web.id');

  assert.equal(LEOVAN_PROFILE.age, 14);
  assert.equal(LEOVAN_PROFILE.realName, 'Mohammad Sofandi');
  assert.ok(LEOVAN_PROFILE.knownAs.includes('Mohammad Sofandi'));
  assert.equal(LEOVAN_PROFILE.rank, 'IMMORTAL');
  assert.equal(LEOVAN_CONTACTS.channels.length, 3);
  assert.ok(!LEOVAN_CONTACTS.channels.some((c) => c.title.toLowerCase().includes('instagram')));
});
