export function getAvatarURL(id: string): string {
  return `${process.env.REACT_APP_API_BASE_URL}/chats/${id}/avatar`;
}
