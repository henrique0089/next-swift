export function getInitials(name: string) {
  const parts = name.split(' ')

  let initials = ''

  for (let i = 0; i < parts.length; i++) {
    initials += parts[i][0].toUpperCase()
  }

  return initials
}
