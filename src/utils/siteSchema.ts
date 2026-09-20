export function siteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Quizspace',
    description: 'Focused English and mathematics quizzes for self-paced practice.',
    url: window.location.origin,
  }
}
