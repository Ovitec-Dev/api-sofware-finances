import { NextFunction, Request, Response } from 'express';
import YAML from 'yamljs';
import { config } from '@shared/index';
import { ErrorDetail } from '@shared/interface/haddler';
import logger from '@shared/utils/logger';

const errors = YAML.load(config.DIR_ERRORS);

// export class AppError extends Error {
//   status: number;

//   constructor(message: string, status: number) {
//     super(message);
//     this.status = status;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

export async function createError(errorKey: string, lang: 'en' | 'es' = 'en'): Promise<ErrorDetail> {
  const keys = errorKey.split('.');
  let errorType: any = errors;
  
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    errorType = errorType[key];
    if (!errorType) break;
  }

  if (!errorType || !errorType.message) {
    return {
      key: 'internal_error',
      code: 'INTERNAL_SERVER_ERROR',
      message: lang === 'es' ? 'Ocurrió un error interno.' : 'An internal error occurred.',
      status: 500,
    };
  }

  return {
    key: errorType.key,
    code: errorType.code,
    message: errorType.message[lang],
    status: errorType.status,
  };
}
// const lang = req.headers['accept-language']?.startsWith('es') ? 'es' : 'en';

export async function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  console.log('se comienza a manejar el error');
  const lang = 'en'; // Puedes reintroducir la lógica de idioma si lo deseas
  let errorDetail: ErrorDetail;

  try {
    if (err instanceof Error) {
      errorDetail = await createError(err.message, lang);
    } else {
      errorDetail = await createError('INTERNAL_SERVER_ERROR.internal_error', lang);
    }

    logger.error(`Error del servidor: ${errorDetail.message}`);
    res.status(errorDetail.status).json(errorDetail);
  } catch (error) {
    // Manejo de errores internos
    logger.error('Error inesperado en el manejador de errores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}