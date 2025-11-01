const path = require('path');
const fs = require('fs');
const winston = require('winston');
const expressWinston = require('express-winston');

// Asegura que la carpeta logs exista (defensa extra)
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// formato JSON con timestamp
const jsonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

//Logger de solicitudes -> requests.log
const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: path.join(logsDir, 'requests.log'),
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5,
        }),
    ],
    format: jsonFormat,
    meta: true,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}}',
    expressFormat: false,
    colorize: false,
});

//Logger de errores -> errors.log
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logsDir, 'errors.log'),
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5,
        }),
    ],
    format: jsonFormat,
});

module.exports = {
    requestLogger,
    errorLogger,
};
