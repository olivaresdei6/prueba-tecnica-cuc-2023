import * as Joi from "joi";

/**
 * Un validation Schema es un objeto que define la estructura de un objeto que
 * se va a validar. En este caso, se define la estructura de un objeto que se
 * va a utilizar para configurar la aplicación. El objeto de configuración de la
 * aplicación se define en el archivo .env. Para ello se utiliza la librería Joi.
 * Esta librería con más de 11 millones de descargas en npm, es una de las
 * librerías más populares para la validación de datos en NodeJS y además se
 * caracteriza por ser muy sencilla de usar.
 */

export const JoiValidationSchema = Joi.object({
	DATABASE_NAME: Joi.string().required(),
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_PORT: Joi.number().default(5432),
	DATABASE_PORT_PROD: Joi.number().default(5432),
	DATABASE_HOST_PROD: Joi.string().required(),
	DATABASE_HOST: Joi.string().required(),
	PORT_SERVER: Joi.number().default(3000),
	PORT_SERVER_PROD: Joi.number().default(3000),
	JWT_SECRET: Joi.string().required(),
	STAGE: Joi.string().valid("dev", "prod").required(),
	URL_API: Joi.string().required(),

});
