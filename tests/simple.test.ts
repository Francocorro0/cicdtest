test('Verifica que el entorno de CI funcione', () => {
  const formulaCiCd = 'CI' + 'CD'
  expect(formulaCiCd).toBe('CICD')
})
