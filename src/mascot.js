// ============================================================
//  MASCOT CONFIG — swap your images here, one line each
//  All paths are relative to /public/mascot/
//  To replace an image: change the filename, drop your file
//  into public/mascot/, done.
// ============================================================

const MASCOT_BASE = '/mascot/';

export const MASCOT = {
  // Home page hero section — excited, arms raised
  hero:    MASCOT_BASE + 'hero.svg',

  // Battle page idle/matchmaking state — battle stance, fist forward
  battle:  MASCOT_BASE + 'battle.svg',

  // Battle page — referee/judge after results
  referee: MASCOT_BASE + 'referee.svg',

  // Rank/Leaderboard page — crown & trophy
  rank:    MASCOT_BASE + 'rank.svg',

  // Learn/Lesson pages — glasses & book, study mode
  study:   MASCOT_BASE + 'study.svg',
};

// Optional: shared alt text for accessibility
export const MASCOT_ALT = 'EduRoyale penguin mascot';
