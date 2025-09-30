package com.lawconnect.lawconnect.controller;

import com.lawconnect.lawconnect.model.Appointment;
import com.lawconnect.lawconnect.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //  LAWYER and CLIENT can create appointments
    @PostMapping
    //@PreAuthorize("hasAnyRole('LAWYER', 'CLIENT')")
    public ResponseEntity<Appointment> create(@RequestBody Appointment appointment) {
        return ResponseEntity.status(201).body(appointmentService.create(appointment));
    }

    //  All roles can view all appointments
    @GetMapping
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER', 'CLIENT')")
    public List<Appointment> getAll() {
        return appointmentService.getAll();
    }

    //  All roles can view specific appointment
    @GetMapping("/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN', 'LAWYER', 'CLIENT')")
    public ResponseEntity<Appointment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getById(id));
    }

    //  Only LAWYER and ADMIN can update
    @PutMapping("/{id}")
    //@PreAuthorize("hasAnyRole('LAWYER', 'ADMIN')")
    public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment updated) {
        return ResponseEntity.ok(appointmentService.update(id, updated));
    }

    //  Only ADMIN can delete
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        appointmentService.delete(id);
        return ResponseEntity.ok().build();
    }
}
