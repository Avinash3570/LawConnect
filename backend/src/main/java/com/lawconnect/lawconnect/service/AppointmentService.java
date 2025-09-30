package com.lawconnect.lawconnect.service;

import com.lawconnect.lawconnect.model.Appointment;
import com.lawconnect.lawconnect.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment create(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    public Appointment getById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment update(Long id, Appointment updated) {
        Appointment existing = getById(id);
        existing.setDateTime(updated.getDateTime());
        existing.setDescription(updated.getDescription());
        existing.setClient(updated.getClient());
        existing.setLawyer(updated.getLawyer());
        existing.setStatus(updated.getStatus());
        return appointmentRepository.save(existing);
    }

    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }
}

