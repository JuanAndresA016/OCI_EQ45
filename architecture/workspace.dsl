workspace {

    !include model.dsl

    views {
        systemContext projectSystem {
            include *
            autoLayout
        }

        container projectSystem {
            include *
            autoLayout
        }

        dynamic projectSystem "LoginFlow" "Flujo de login" {
            teamMember -> webApp "Inicia sesion"
            webApp -> authService "Envia credenciales"
            authService -> db "Valida usuario"
            authService -> webApp "Devuelve token"
            autoLayout
        }

        deployment projectSystem "AWS" {
            include *
            autoLayout
        }

        theme default
    }
}
