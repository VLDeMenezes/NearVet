import jwt from "jsonwebtoken";

const secret = "clavesecreta01";

const verifyToken = (token: string, secretKey: string = secret) => {
  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secretKey);

    return decoded; // Retorna los datos del token
  } catch (error: any) {
    alert(`Error: ${error.message}`);
    return null; // Retorna null si el token es inválido
  }
};

export default verifyToken;
