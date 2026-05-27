# Release Notes — v1.0.0

**Release Date:** 26-05-2026
**Audience:** Developers & Stakeholders

---

## New Features

- **Creacion de Proyectos**: El usuario puede crear un proyect dentro de sistema, definiendo fecha de inicio, fecha de fin y miembros del equipo que estaran en el proyecto
- **Creacion de tareas**: Dentro del proyecto se pueden crear tareas y estas se le pueden asignar a un miembro o a varios
- **Asignacion de Roles**: El admin le puede asignar los roles a los distintos miebros del equipo
- **Creación subtareas**: Dentro de las tareas se pueden crear subtareas para que estas sean mas facil de hacer y tener un mejor monitoreo de estas

---

## Improvements

- **Pipeline CI/CD con OCI DevOps:** Se implementó un pipeline automatizado de construcción y despliegue usando Oracle Cloud Infrastructure DevOps, eliminando la necesidad de despliegues manuales y asegurando que cada push a `main` sea validado y desplegado automáticamente.
- **Infraestructura en OCI:** La aplicación está hospedada en Oracle Cloud Infrastructure, garantizando alta disponibilidad, escalabilidad y seguridad.

---

## Bug Fixes

- Problemas para funcionamiento correcto del CI/CD build correcto pero problemas con del Deploy | Se busco cual era el problema dentro de OCI el cual era problemas dentro del build_spec, se corregieron estos problemas y se arreglo lo del Deploy

---

## Breaking Changes / Deprecations

- **Sin cambios disruptivos**

---

## Known Issues

- Problemas con la Vectorizacion de strings
- Embedings en la base de datos
  
---

## Documentation & Links

- [Repository — main branch](https://github.com/JuanAndresA016/OCI_EQ45/tree/main)

--- 
