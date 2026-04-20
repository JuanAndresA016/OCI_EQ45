package com.oci45.mazetasks.controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.sql.DataSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    private final DataSource dataSource;

    public testController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/users")
    public String getUsers() throws Exception {
        StringBuilder result = new StringBuilder();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM personas")) {

            while (rs.next()) {
                result.append(rs.getString("NOMBRE")).append("\n");
            }
        }

        return result.toString();
    }
}