export type JwtPayload = {
  sub: number; // user id
  role: 'Staff' | 'Patient';
};
