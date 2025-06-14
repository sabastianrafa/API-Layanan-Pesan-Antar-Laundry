import {
  createPesanan,
  getPesananUser,
  getAllPesanan,
  updateStatusPesanan
} from '../services/pesananService.js';

export const createPesananController = async (req, res) => {
  const pesanan = await createPesanan(req.user.id, req.body);
  res.status(201).json({
    success: true,
    data: pesanan
  });
};

export const getPesananUserController = async (req, res) => {
  const pesanan = await getPesananUser(req.user.id);
  res.json({
    success: true,
    data: pesanan
  });
};

export const getAllPesananController = async (req, res) => {
  const pesanan = await getAllPesanan();
  res.json({
    success: true,
    data: pesanan
  });
};

export const updateStatusController = async (req, res) => {
  const pesanan = await updateStatusPesanan(
    Number(req.params.id),
    req.body.status
  );
  res.json({
    success: true,
    data: pesanan
  });
};