const CURRENT_ANNOUNCEMENT_TAG = 'announcement-read-1.1.0';
const CURRENT_ANNOUNCEMENT_TEXT = 'You can now import your %pals as contacts! Settings > \"Import my %pals\"';

export function getUnreadAnnouncement(): string | null {
  const markedRead = localStorage.getItem(CURRENT_ANNOUNCEMENT_TAG) == 'true';
  if (markedRead) {
    return null;
  }
  return CURRENT_ANNOUNCEMENT_TEXT;
}

export function markAnnouncementRead() {
  localStorage.setItem(CURRENT_ANNOUNCEMENT_TAG, 'true');
}
