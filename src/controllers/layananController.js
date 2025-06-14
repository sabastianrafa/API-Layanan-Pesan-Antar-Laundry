import {
  getAllLayanan,
  createLayanan,
  updateLayanan,
  deleteLayanan
} from '../services/layananService.js';

export const getAllLayananController = async (req, res) => {
  const layanan = await getAllLayanan();
  res.json({ success: true, data: layanan });
};

export const createLayananController = async (req, res) => {
  const layanan = await createLayanan(req.body);
  res.status(201).json({ success: true, data: layanan });
};

export const updateLayananController = async (req, res) => {
  const layanan = await updateLayanan(Number(req.params.id), req.body);
  res.json({ success: true, data: layanan });
};

export const deleteLayananController = async (req, res) => {
  await deleteLayanan(Number(req.params.id));
  res.json({ success: true, message: 'Layanan deleted' });
};