async function getData() {
  // Buscar dados da API
  const res = await fetch('https://api.example.com/data')
  if (!res.ok) {
    throw new Error('Falha ao carregar dados')
  }
  return res.json()
}

export default async function HomeContent() {
  const data = await getData()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Meu Site</h1>
      {/* Renderizar dados */}
    </div>
  )
} 