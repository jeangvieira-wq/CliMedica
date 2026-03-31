import { supabase } from './database.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('pacientes')
      .select('*')

    if (error) return res.status(500).json(error)

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { nome, email, telefone } = req.body

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    const { data, error } = await supabase
      .from('pacientes')
      .insert([{ nome, email, telefone }])

    if (error) return res.status(500).json(error)

    return res.status(201).json(data)
  }

  return res.status(405).send('Método não permitido')
}