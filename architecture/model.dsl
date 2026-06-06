model {
    teamMember = person "Miembro del equipo" {
        description "Usuario que interactúa con el sistema."
    }

    admin = person "Administrador del proyecto" {
        description "Gestiona usuarios y configuraciones."
    }

    projectSystem = softwareSystem "Sistema de gestion de proyectos" {
        description "Plataforma para colaboracion y seguridad."

        webApp = container "Interfaz Web/Movil" {
            technology "React / Flutter"
            description "Frontend para miembros del equipo."
        }

        adminPortal = container "Portal Administrativo" {
            technology "Angular"
            description "Frontend para administradores."
        }

        authService = container "Servicio de autenticacion" {
            technology "Spring Boot"
            description "Login y MFA."
        }

        rbacService = container "Servicio de autorizacion" {
            technology "Spring Boot"
            description "Valida roles y permisos."
        }

        taskService = container "Servicio de gestion de tareas" {
            technology "Spring Boot"
            description "CRUD de tareas y asignacion."
        }

        recommender = container "IA de recomendaciones" {
            technology "Python ML"
            description "Genera recomendaciones basadas en analitica."
        }

        analytics = container "Servicio de analitica" {
            technology "Python / Spark"
            description "Procesa estadisticas de uso y tareas."
        }

        db = container "Base de datos principal" {
            technology "PostgreSQL"
            description "Almacena usuarios, tareas y configuraciones."
        }

        encrypt = container "Servicio de cifrado" {
            technology "AES-256"
            description "Cifra y descifra datos sensibles."
        }

        lb = container "Balanceador de carga" {
            technology "NGINX"
            description "Distribuye trafico y escala horizontalmente."
        }
    }

    teamMember -> webApp "Usa"
    admin -> adminPortal "Usa"
    webApp -> authService "Solicita autenticacion"
    webApp -> taskService "Gestiona tareas"
    webApp -> recommender "Solicita recomendaciones"
    webApp -> analytics "Consulta estadisticas"
    adminPortal -> rbacService "Gestiona usuarios"
    authService -> db "Consulta credenciales"
    rbacService -> db "Valida roles"
    taskService -> db "CRUD tareas"
    recommender -> db "Lee datos"
    analytics -> db "Procesa estadisticas"
    authService -> encrypt "Cifra tokens"
    lb -> authService
    lb -> taskService

    deploymentEnvironment "AWS" {
        deploymentNode aws "AWS Cloud" {
            containerInstance lb
            containerInstance webApp
            containerInstance adminPortal
            containerInstance authService
            containerInstance rbacService
            containerInstance taskService
            containerInstance recommender
            containerInstance analytics
            containerInstance db
            containerInstance encrypt
        }
    }
}
