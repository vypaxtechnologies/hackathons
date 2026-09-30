export const TEAM_SIZE_DESC = (hackathon) => {
  if (!hackathon) return '2-4 members'
  
  const min = hackathon.teamSizeMin || 2
  const max = hackathon.teamSizeMax || 4
  
  return min === max ? `${min} member` : `${min}-${max} members`
}