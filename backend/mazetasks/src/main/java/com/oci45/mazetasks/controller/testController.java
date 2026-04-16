package com.oci45.mazetasks.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.sql.DataSource;

@RestController
public class testController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-db")
public String test() {
    try (var conn = dataSource.getConnection()) {
        return "Conectado ✅";
    } catch (Exception e) {
        return e.getMessage();
    }
}
}