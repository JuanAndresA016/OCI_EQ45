# Guía de Usuario — Chatbot-OCI
V 1.0.0

#  Information Architecture & Discovery

## Propósito del Sistema

Un chatbot diseñado para ayudar a desarrolladores a gestionar proyectos, tareas y subtareas el objetivo principal del sistema es mejorar la organización, productividad y visualización de tareas dentro de proyectos colaborativos.

El sistema permite:
- Gestionar proyectos
- Gestionar tareas
- Crear subtareas
- Asignar miembros y roles
- Monitorear progreso

### Usuarios Principales
- Desarrolladores
- Equipos técnicos


### User Goals
- Organizar tareas
- Visualizar el progreso del proyecto
- Asignar responsabilidades
- Dividir tareas grandes en subtareas

---

## Flujo Principal del Sistema

Flujo Basico

1. Abrir App de telegram.
2. Seleccionar el chat con el chatbot.
3. Registrarse dentro del chat (Dar nombre y contraseña).
4. Chatbot muestra las tareas.
5. Elegir opción de crear o eliminar tarea (Seleccionar el botón).
6. Llenar campos de crear fecha y enviar.
7. En caso de eliminar tarea, cliquear confirmación y la tarea es eliminada.
8. Chatbot muestra lista actualizada.
9. Cerrar sesión.


Interacción mediante Telegram (sesión ya iniciada/miembro equipo).

Flujo general:
1. El usuario accede al bot
2. El usuario accede un proyecto
3. El usuario accede a una tarea o crea una tarea
4. Usuario trabaja en las tareas y subtareas
5. Usuario marca tarea coomo completada

Interacción mediante Telegram (sesión ya iniciada/admin).
1. El usuario accede al bot
2. El usuario crea un proyecto
3. El usuario añade miembros al equipo
5. El usuario crea tareas
6. El usuario asigna tareas
7. El usuario monitorea estados y progreso

---


# Content Generation & Design

## Paso 1 — Instalar Telegram

Descargar la última versión de Telegram.

## Paso 2 — Acceder al Bot

Abrir Telegram y buscar el bot ya configurado.

## Paso 3 — Acceder al proyecto

Suele estar esto ya configurado

## Paso 4 — Acceder o Crear una Tarea

Clickear el boton de la tarea en la que se quiera trabajar.

En caso de querer trabajar en una nueva clickear en crear tarea.

# Funcionalidades del Sistema

## Funciones de Autenticación
- Registro de usuarios
- Inicio de sesión
- Gestión de sesiones
- 

## Funciones de Gestión de Proyectos
- Crear proyectos
- Visualizar proyectos
- Gestionar miembros del equipo

## Funciones de Gestión de Tareas
- Crear tareas
- Eliminar tareas
- Asignar tareas
- Actualizar estados de tareas


## Funciones de Subtareas
- Crear subtareas
- Actualizar estados

---

# Technical Validation

## Versión
- Chatbot-OCI Versión 1.0.0

---

## Plataformas Compatibles
- Telegram Desktop
- Telegram Android
- Telegram iOS
- Telegram Web
- Version Web del Sitema

---

# Tecnologías Utilizadas
- Telegram
- Node.js
- Spring Boot
- Docker
- OCI

---

# Roles de Usuario

## Administrador
Permisos:
- Gestionar usuarios
- Gestionar proyectos
- Gestionar Tareas
- Gestionar Subtareas
- Asignar roles

## Miembro del Equipo
- Ver tareas
- Actualizar estados
- Crear subtareas
- Crea Tareas (En caso de que se le hayan dado los permisos)
- Permisos que varian segun el rol

---

# Gestión de Proyectos

## Crear un Proyecto

### Pasos
1. Abrir Telegram
2. Acceder al bot
3. Clickear boton de crear proyecto
4. Ingresar datos de proyecto (Nombre, Fecha Inicio Fin, Descipción)
5. Agregar miembros
6. Crear Proyecto

---

# Gestión de Tareas

## Crear una Tarea

### Pasos
1. Seleccionar un proyecto
2. Escribir:
3. Ingresar datos de la tarea (Nombre, Fecha Inicio Fin, Descipción)
4. Asignar miembro o rol
5. Guardar tarea


## Estados Disponibles de tareas

- Pendiente
- En Progreso
- Completada
- Retarasada

## Eliminar una Tarea

### Pasos
1. Abrir la tarea
2. Seleccionar eliminar
3. Confirmar acción

## Recibir recomendaciones
Dentro de pestaña de tareas clickear en recomendacion de IA
   
---

# Gestión de Subtareas

## Crear una Subtarea

### Pasos
1. Abrir una tarea
2. Seleccionar crear subtarea
3. Ingresar información
4. Guardar cambios

---

## Estados de Subtareas

- Pendiente
- En Progreso
- Completada
- Retarasada

---

### Posibles Errores
- Token inválido
- Contenedor detenido
- Servicios OCI inactivos
