export const updateProfileController = async (req, res) => {
  const user = await updateProfile(req.user.id, req.body);
  res.json({ success: true, data: user });
};

export const changePasswordController = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await changePassword(req.user.id, currentPassword, newPassword);
  res.json({ success: true, message: 'Password berhasil diubah' });
};

// Admin controllers
export const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();
  res.json({ success: true, data: users });
};

export const updateUserRoleController = async (req, res) => {
  const user = await updateUserRole(Number(req.params.id), req.body.role);
  res.json({ success: true, data: user });
};