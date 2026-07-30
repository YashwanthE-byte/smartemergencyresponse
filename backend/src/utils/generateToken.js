import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'super_secret_jwt_key_smart_emergency_response_system_2026',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};
