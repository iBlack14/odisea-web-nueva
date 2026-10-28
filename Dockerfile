# ==============================================================================
# ODISEACLOUD — Dockerfile para Easypanel / Servidores VPS
# Servidor Apache + PHP optimizado con mod_rewrite y URLs limpias
# ==============================================================================

FROM php:8.2-apache

# Habilitar mod_rewrite y mod_headers en Apache
RUN a2enmod rewrite headers expires deflate

# Configurar ServerTokens y cabeceras seguras
RUN echo "ServerTokens Prod" >> /etc/apache2/apache2.conf \
    && echo "ServerSignature Off" >> /etc/apache2/apache2.conf

# Permitir lectura de .htaccess en /var/www/html
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto
COPY . /var/www/html/

# Excluir archivos innecesarios para producción y fijar permisos
RUN rm -rf /var/www/html/node_modules \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Reclamaciones fuera del directorio público. Montar almacenamiento persistente
# en /var/lib/odisea antes de habilitar el registro en Easypanel.
RUN mkdir -p /var/lib/odisea/claims \
    && chown -R www-data:www-data /var/lib/odisea \
    && chmod 700 /var/lib/odisea/claims

# Puerto HTTP estándar
EXPOSE 80

CMD ["apache2-foreground"]
