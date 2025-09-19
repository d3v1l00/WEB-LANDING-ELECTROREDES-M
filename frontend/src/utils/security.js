/**
 * SISTEMA DE SEGURIDAD ROBUSTO - ElectroRedes Medellín
 * Protección contra: XSS, SQL Injection, SSTI, LFI, RFI, CSRF
 * Preparado para escalabilidad futura con backend
 */

// =============================================================================
// SANITIZACIÓN DE ENTRADA (XSS Protection)
// =============================================================================

/**
 * Sanitiza texto removiendo scripts maliciosos y caracteres peligrosos
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    // Remover scripts y elementos peligrosos
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, '')
    .replace(/<meta\b[^<]*(?:(?!<\/meta>)<[^<]*)*<\/meta>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    
    // Remover atributos peligrosos
    .replace(/on\w+\s*=/gi, '') // onClick, onLoad, etc.
    .replace(/javascript:/gi, '') // javascript: protocol
    .replace(/vbscript:/gi, '') // vbscript: protocol
    .replace(/data:/gi, '') // data: protocol
    
    // Remover caracteres de escape y control
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    
    // Limitar longitud
    .substring(0, 1000);
};

/**
 * Sanitización específica para nombres (solo letras, espacios, acentos)
 */
export const sanitizeName = (input) => {
  if (typeof input !== 'string') return '';
  
  return sanitizeText(input)
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') // Solo letras y espacios
    .replace(/\s+/g, ' ') // Múltiples espacios a uno
    .trim()
    .substring(0, 100);
};

/**
 * Sanitización específica para emails
 */
export const sanitizeEmail = (input) => {
  if (typeof input !== 'string') return '';
  
  return sanitizeText(input)
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '') // Solo caracteres válidos para email
    .substring(0, 254); // RFC 5321 limit
};

/**
 * Sanitización específica para mensajes
 */
export const sanitizeMessage = (input) => {
  if (typeof input !== 'string') return '';
  
  return sanitizeText(input)
    .replace(/[<>]/g, '') // Remover brackets adicionales
    .trim()
    .substring(0, 2000);
};

// =============================================================================
// PROTECCIÓN CONTRA SQL INJECTION
// =============================================================================

/**
 * Escapa caracteres peligrosos para SQL (preparado para backend futuro)
 */
export const escapeSQLChars = (input) => {
  if (typeof input !== 'string') return '';
  
  const sqlDangerousChars = [
    "'", '"', ';', '--', '/*', '*/', 'xp_', 'sp_', 
    'UNION', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 
    'DROP', 'CREATE', 'ALTER', 'EXEC', 'EXECUTE'
  ];
  
  let sanitized = input;
  sqlDangerousChars.forEach(char => {
    const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  return sanitized;
};

// =============================================================================
// PROTECCIÓN CONTRA SSTI (Server Side Template Injection)
// =============================================================================

/**
 * Remueve patrones de template injection
 */
export const preventSSTI = (input) => {
  if (typeof input !== 'string') return '';
  
  const sstiPatterns = [
    /\{\{.*\}\}/g, // Handlebars, Mustache
    /\{%.*%\}/g,   // Jinja2, Twig
    /\$\{.*\}/g,   // Template literals
    /<%.*%>/g,     // ASP, ERB
    /\{\{.*\}\}/g, // Angular expressions
    /\#\{.*\}/g    // Ruby interpolation
  ];
  
  let sanitized = input;
  sstiPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized;
};

// =============================================================================
// PROTECCIÓN CONTRA LFI/RFI (Local/Remote File Inclusion)
// =============================================================================

/**
 * Remueve patrones de file inclusion
 */
export const preventFileInclusion = (input) => {
  if (typeof input !== 'string') return '';
  
  const fileInclusionPatterns = [
    /\.\.\//g,     // Directory traversal
    /\.\.\\/g,     // Windows directory traversal
    /\/etc\//gi,   // Unix system files
    /\/proc\//gi,  // Unix process files
    /\/sys\//gi,   // Unix system files
    /\/dev\//gi,   // Unix device files
    /\/tmp\//gi,   // Temp files
    /\/var\//gi,   // Variable files
    /\/usr\//gi,   // User files
    /\/bin\//gi,   // Binary files
    /\/sbin\//gi,  // System binary files
    /\/boot\//gi,  // Boot files
    /\/root\//gi,  // Root directory
    /\/home\//gi,  // Home directories
    /\/opt\//gi,   // Optional software
    /\/mnt\//gi,   // Mount points
    /\/media\//gi, // Media mount points
    /c:\\/gi,      // Windows C drive
    /d:\\/gi,      // Windows D drive
    /e:\\/gi,      // Windows E drive
    /windows\\/gi, // Windows directory
    /system32\\/gi,// Windows system
    /program files/gi, // Windows programs
    /documents and settings/gi, // Windows user dirs
    /users\\/gi,   // Windows users
    /appdata\\/gi, // Windows app data
    /temp\\/gi,    // Windows temp
    /inetpub\\/gi, // IIS directory
    /wwwroot\\/gi  // Web root
  ];
  
  let sanitized = input;
  fileInclusionPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  return sanitized;
};

// =============================================================================
// VALIDACIONES ROBUSTAS
// =============================================================================

/**
 * Validación robusta de email
 */
export const validateEmailSecure = (email) => {
  const sanitizedEmail = sanitizeEmail(email);
  
  // Regex más estricto para email
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  
  // Verificaciones adicionales
  const isValidFormat = emailRegex.test(sanitizedEmail);
  const hasValidLength = sanitizedEmail.length >= 5 && sanitizedEmail.length <= 254;
  const hasValidDomain = sanitizedEmail.includes('.') && !sanitizedEmail.endsWith('.');
  const noConsecutiveDots = !sanitizedEmail.includes('..');
  const noSpecialStart = !sanitizedEmail.startsWith('.') && !sanitizedEmail.startsWith('@');
  
  return {
    isValid: isValidFormat && hasValidLength && hasValidDomain && noConsecutiveDots && noSpecialStart,
    sanitized: sanitizedEmail,
    errors: {
      format: !isValidFormat ? 'Formato de email inválido' : null,
      length: !hasValidLength ? 'Email debe tener entre 5 y 254 caracteres' : null,
      domain: !hasValidDomain ? 'Dominio de email inválido' : null,
      dots: !noConsecutiveDots ? 'Email no puede tener puntos consecutivos' : null,
      start: !noSpecialStart ? 'Email no puede empezar con punto o @' : null
    }
  };
};

/**
 * Validación robusta de nombre
 */
export const validateNameSecure = (name) => {
  const sanitizedName = sanitizeName(name);
  
  const hasValidLength = sanitizedName.length >= 2 && sanitizedName.length <= 100;
  const hasValidChars = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(sanitizedName);
  const notOnlySpaces = sanitizedName.trim().length > 0;
  const noExcessiveSpaces = !sanitizedName.includes('   '); // Máximo 2 espacios seguidos
  
  return {
    isValid: hasValidLength && hasValidChars && notOnlySpaces && noExcessiveSpaces,
    sanitized: sanitizedName,
    errors: {
      length: !hasValidLength ? 'Nombre debe tener entre 2 y 100 caracteres' : null,
      chars: !hasValidChars ? 'Nombre solo puede contener letras y espacios' : null,
      spaces: !notOnlySpaces ? 'Nombre no puede estar vacío' : null,
      excessive: !noExcessiveSpaces ? 'Nombre no puede tener espacios excesivos' : null
    }
  };
};

/**
 * Validación robusta de mensaje
 */
export const validateMessageSecure = (message) => {
  const sanitizedMessage = sanitizeMessage(message);
  
  const hasValidLength = sanitizedMessage.length >= 10 && sanitizedMessage.length <= 2000;
  const notOnlySpaces = sanitizedMessage.trim().length >= 10;
  const hasValidContent = !/^(.)\1{9,}$/.test(sanitizedMessage); // No solo caracteres repetidos
  
  return {
    isValid: hasValidLength && notOnlySpaces && hasValidContent,
    sanitized: sanitizedMessage,
    errors: {
      length: !hasValidLength ? 'Mensaje debe tener entre 10 y 2000 caracteres' : null,
      spaces: !notOnlySpaces ? 'Mensaje no puede estar vacío o solo espacios' : null,
      content: !hasValidContent ? 'Mensaje no puede ser solo caracteres repetidos' : null
    }
  };
};

// =============================================================================
// SANITIZACIÓN COMPLETA DE FORMULARIO
// =============================================================================

/**
 * Sanitiza y valida todos los campos del formulario
 */
export const sanitizeAndValidateForm = (formData) => {
  // Aplicar todas las capas de sanitización
  const nameResult = validateNameSecure(
    preventFileInclusion(
      preventSSTI(
        escapeSQLChars(formData.name || '')
      )
    )
  );
  
  const emailResult = validateEmailSecure(
    preventFileInclusion(
      preventSSTI(
        escapeSQLChars(formData.email || '')
      )
    )
  );
  
  const messageResult = validateMessageSecure(
    preventFileInclusion(
      preventSSTI(
        escapeSQLChars(formData.message || '')
      )
    )
  );
  
  // Compilar errores
  const errors = {};
  if (!nameResult.isValid) {
    errors.name = Object.values(nameResult.errors).filter(Boolean)[0];
  }
  if (!emailResult.isValid) {
    errors.email = Object.values(emailResult.errors).filter(Boolean)[0];
  }
  if (!messageResult.isValid) {
    errors.message = Object.values(messageResult.errors).filter(Boolean)[0];
  }
  
  return {
    isValid: nameResult.isValid && emailResult.isValid && messageResult.isValid,
    sanitizedData: {
      name: nameResult.sanitized,
      email: emailResult.sanitized,
      message: messageResult.sanitized
    },
    errors
  };
};

// =============================================================================
// RATE LIMITING MEJORADO
// =============================================================================

/**
 * Sistema de rate limiting más robusto
 */
export class AdvancedRateLimiter {
  constructor(maxAttempts = 3, timeWindow = 60000, blockDuration = 300000) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow; // 1 minuto
    this.blockDuration = blockDuration; // 5 minutos de bloqueo
    this.attempts = new Map();
    this.blockedUntil = new Map();
  }

  canAttempt(identifier) {
    const now = Date.now();
    
    // Verificar si está bloqueado
    const blockedUntil = this.blockedUntil.get(identifier);
    if (blockedUntil && now < blockedUntil) {
      return {
        allowed: false,
        reason: 'blocked',
        timeRemaining: Math.ceil((blockedUntil - now) / 1000)
      };
    }
    
    // Limpiar bloqueo expirado
    if (blockedUntil && now >= blockedUntil) {
      this.blockedUntil.delete(identifier);
      this.attempts.delete(identifier);
    }
    
    // Verificar intentos recientes
    const userAttempts = this.attempts.get(identifier) || [];
    const recentAttempts = userAttempts.filter(timestamp => now - timestamp < this.timeWindow);
    
    if (recentAttempts.length >= this.maxAttempts) {
      // Bloquear usuario
      this.blockedUntil.set(identifier, now + this.blockDuration);
      return {
        allowed: false,
        reason: 'rate_limited',
        timeRemaining: Math.ceil(this.blockDuration / 1000)
      };
    }
    
    // Registrar intento
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return {
      allowed: true,
      attemptsRemaining: this.maxAttempts - recentAttempts.length
    };
  }

  reset(identifier) {
    this.attempts.delete(identifier);
    this.blockedUntil.delete(identifier);
  }
}

// =============================================================================
// PROTECCIÓN CSRF (Para uso futuro con backend)
// =============================================================================

/**
 * Genera token CSRF (para implementación futura)
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Valida token CSRF (para implementación futura)
 */
export const validateCSRFToken = (token, expectedToken) => {
  if (!token || !expectedToken) return false;
  if (token.length !== expectedToken.length) return false;
  
  // Comparación constante en tiempo para evitar timing attacks
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }
  return result === 0;
};

// =============================================================================
// UTILIDADES ADICIONALES
// =============================================================================

/**
 * Genera un identificador único para rate limiting
 */
export const getUserIdentifier = () => {
  // En desarrollo, usar IP simulada
  // En producción, se obtendría la IP real del usuario
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Log de eventos de seguridad (para implementación futura)
 */
export const logSecurityEvent = (event, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    data,
    userAgent: navigator.userAgent.substring(0, 200),
    url: window.location.href
  };
  
  // En desarrollo, log a consola
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 Security Event:', logEntry);
  }
  
  // En producción, enviar a backend de logging
  // fetch('/api/security/log', { method: 'POST', body: JSON.stringify(logEntry) });
  
  return logEntry;
};

export default {
  sanitizeText,
  sanitizeName,
  sanitizeEmail,
  sanitizeMessage,
  escapeSQLChars,
  preventSSTI,
  preventFileInclusion,
  validateEmailSecure,
  validateNameSecure,
  validateMessageSecure,
  sanitizeAndValidateForm,
  AdvancedRateLimiter,
  generateCSRFToken,
  validateCSRFToken,
  getUserIdentifier,
  logSecurityEvent
};
