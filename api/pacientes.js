import { supabase } from './database.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')

    if (error) return res.status(500).json(error)

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { nome, email } = req.body

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nome, email }])

    if (error) return res.status(500).json(error)

    return res.status(201).json(data)
  }

  return res.status(405).send('Método não permitido')
}